const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("inventory service", async () => {
  let thisService;
  let inventoryCreated;
  let usersServiceResults;
  let users;

  

  beforeEach(async () => {
    thisService = await app.service("inventory");

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
    assert.ok(thisService, "Registered the service (inventory)");
  });

  describe("#create", () => {
    const options = {"stockNo":"new value","itemName":"new value","currentStock":23,"unit":"new value","reorderLevel":"new value","supplier":"new value"};

    beforeEach(async () => {
      inventoryCreated = await thisService.Model.create({...options, ...users});
    });

    it("should create a new inventory", () => {
      assert.strictEqual(inventoryCreated.stockNo, options.stockNo);
assert.strictEqual(inventoryCreated.itemName, options.itemName);
assert.strictEqual(inventoryCreated.currentStock, options.currentStock);
assert.strictEqual(inventoryCreated.unit, options.unit);
assert.strictEqual(inventoryCreated.reorderLevel, options.reorderLevel);
assert.strictEqual(inventoryCreated.supplier, options.supplier);
    });
  });

  describe("#get", () => {
    it("should retrieve a inventory by ID", async () => {
      const retrieved = await thisService.Model.findById(inventoryCreated._id);
      assert.strictEqual(retrieved._id.toString(), inventoryCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"stockNo":"updated value","itemName":"updated value","currentStock":100,"unit":"updated value","reorderLevel":"updated value","supplier":"updated value"};

    it("should update an existing inventory ", async () => {
      const inventoryUpdated = await thisService.Model.findByIdAndUpdate(
        inventoryCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(inventoryUpdated.stockNo, options.stockNo);
assert.strictEqual(inventoryUpdated.itemName, options.itemName);
assert.strictEqual(inventoryUpdated.currentStock, options.currentStock);
assert.strictEqual(inventoryUpdated.unit, options.unit);
assert.strictEqual(inventoryUpdated.reorderLevel, options.reorderLevel);
assert.strictEqual(inventoryUpdated.supplier, options.supplier);
    });
  });

  describe("#delete", async () => {
    it("should delete a inventory", async () => {
      await app
        .service("users")
        .Model.findByIdAndDelete(usersServiceResults._id);

      ;

      const inventoryDeleted = await thisService.Model.findByIdAndDelete(inventoryCreated._id);
      assert.strictEqual(inventoryDeleted._id.toString(), inventoryCreated._id.toString());
    });
  });
});