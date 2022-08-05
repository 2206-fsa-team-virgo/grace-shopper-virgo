const Sequelize = require("sequelize");
const db = require("../db");

const Order = db.define("order", {
  status: {
    type: Sequelize.ENUM("active", "closed"),
    defaultValue: "active"
  }
});

module.exports = Order;
