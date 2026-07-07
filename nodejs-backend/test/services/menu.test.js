const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("menu service", async () => {
  let thisService;
  let menuCreated;
  let usersServiceResults;
  let users;

  

  beforeEach(async () => {
    thisService = await app.service("menu");

    // Create users here
    usersServiceResults = await app.service("users").Model.create(usersRefData);
    users = {
      createdBy: usersServiceResults[0]._id,
      updatedBy: usersServiceResults[0]._id,
    };
  });

  after(async () => {
    if (usersServiceResults) {
      await Promise.all(
        usersServiceResults.map((i) =>
          app.service("users").Model.findByIdAndDelete(i._id)
        )
      );
    }
  });

  it("registered the service", () => {
    assert.ok(thisService, "Registered the service (menu)");
  });

  describe("#create", () => {
    const options = {"productCode":"new value","name":"new value","category":"new value","price":23};

    beforeEach(async () => {
      menuCreated = await thisService.Model.create({...options, ...users});
    });

    it("should create a new menu", () => {
      assert.strictEqual(menuCreated.productCode, options.productCode);
assert.strictEqual(menuCreated.name, options.name);
assert.strictEqual(menuCreated.category, options.category);
assert.strictEqual(menuCreated.price, options.price);
    });
  });

  describe("#get", () => {
    it("should retrieve a menu by ID", async () => {
      const retrieved = await thisService.Model.findById(menuCreated._id);
      assert.strictEqual(retrieved._id.toString(), menuCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"productCode":"updated value","name":"updated value","category":"updated value","price":100};

    it("should update an existing menu ", async () => {
      const menuUpdated = await thisService.Model.findByIdAndUpdate(
        menuCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(menuUpdated.productCode, options.productCode);
assert.strictEqual(menuUpdated.name, options.name);
assert.strictEqual(menuUpdated.category, options.category);
assert.strictEqual(menuUpdated.price, options.price);
    });
  });

  describe("#delete", async () => {
    it("should delete a menu", async () => {
      await app
        .service("users")
        .Model.findByIdAndDelete(usersServiceResults._id);

      ;

      const menuDeleted = await thisService.Model.findByIdAndDelete(menuCreated._id);
      assert.strictEqual(menuDeleted._id.toString(), menuCreated._id.toString());
    });
  });
});