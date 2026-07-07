const menu = require("./menu/menu.service.js");
const order = require("./order/order.service.js");
const inventory = require("./inventory/inventory.service.js");
// ~cb-add-require-service-name~

// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(menu);
  app.configure(order);
  app.configure(inventory);
    // ~cb-add-configure-service-name~
};
