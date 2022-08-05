const Sequelize = require("sequelize");
const db = require("../db");

const Order_Product = db.define("order_product", {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1
  },
  unit_price: {
    // will be sent to js as a string
    type: Sequelize.DECIMAL(13, 2),
    defaultValue: 0.0
  },
  total_price: {
    // will be sent to js as a string, probably
    type: Sequelize.VIRTUAL,
    get() {
      return this.quantity * this.unit_price;
    },
    set(value) {
      throw new Error("Do not try to set the `total_price` value!");
    }
  }
});

module.exports = Order_Product;
