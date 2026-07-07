const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("order service", async () => {
  let thisService;
  let orderCreated;
  let usersServiceResults;
  let users;

  

  beforeEach(async () => {
    thisService = await app.service("order");

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
    assert.ok(thisService, "Registered the service (order)");
  });

  describe("#create", () => {
    const options = {"receiptNumber":"new value","dateTime":23,"itemsOrdered":"new value","total":23,"paymentMethod":"new value","type":"new value"};

    beforeEach(async () => {
      orderCreated = await thisService.Model.create({...options, ...users});
    });

    it("should create a new order", () => {
      assert.strictEqual(orderCreated.receiptNumber, options.receiptNumber);
assert.strictEqual(orderCreated.dateTime, options.dateTime);
assert.strictEqual(orderCreated.itemsOrdered, options.itemsOrdered);
assert.strictEqual(orderCreated.total, options.total);
assert.strictEqual(orderCreated.paymentMethod, options.paymentMethod);
assert.strictEqual(orderCreated.type, options.type);
    });
  });

  describe("#get", () => {
    it("should retrieve a order by ID", async () => {
      const retrieved = await thisService.Model.findById(orderCreated._id);
      assert.strictEqual(retrieved._id.toString(), orderCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"receiptNumber":"updated value","dateTime":100,"itemsOrdered":"updated value","total":100,"paymentMethod":"updated value","type":"updated value"};

    it("should update an existing order ", async () => {
      const orderUpdated = await thisService.Model.findByIdAndUpdate(
        orderCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(orderUpdated.receiptNumber, options.receiptNumber);
assert.strictEqual(orderUpdated.dateTime, options.dateTime);
assert.strictEqual(orderUpdated.itemsOrdered, options.itemsOrdered);
assert.strictEqual(orderUpdated.total, options.total);
assert.strictEqual(orderUpdated.paymentMethod, options.paymentMethod);
assert.strictEqual(orderUpdated.type, options.type);
    });
  });

  describe("#delete", async () => {
    it("should delete a order", async () => {
      await app
        .service("users")
        .Model.findByIdAndDelete(usersServiceResults._id);

      ;

      const orderDeleted = await thisService.Model.findByIdAndDelete(orderCreated._id);
      assert.strictEqual(orderDeleted._id.toString(), orderCreated._id.toString());
    });
  });
});