const Sequelize = require("sequelize");
const db = require("../db");

const Product = db.define("product", {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  price: {
    type: Sequelize.DECIMAL(13, 2),
    defaultValue: 0.0,
    allowNull: false,
    validate: {
      min: 0.0,
    },
  },
  desc: {
    type: Sequelize.TEXT,
  },
  img: {
    type: Sequelize.STRING,
    defaultValue: "https://emojiisland.com/products/neutral-face-emoji-icon",
  },
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    validate: {
      min: 0,
    },
  },
  onSale: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = Product;
