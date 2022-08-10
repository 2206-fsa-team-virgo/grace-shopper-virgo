const router = require("express").Router();
const {
  models: { User, Order, Order_Product, Product },
} = require("../db");
module.exports = router;

const requireToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const user = await User.findByToken(token);
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

// get active order (cart) for logged-in user
router.get("/", requireToken, async (req, res, next) => {
  try {
    if (req.user) {
      const order = await Order.findAll({
        include: {
          model: Product,
          attributes: ["id", "name", "desc", "onSale"],
          through: {
            attributes: ["quantity", "unit_price"],
          },
        },
        where: {
          userId: req.user.id,
          status: "active",
        },
        attributes: ["id", "status"],
      });
      res.status(200).send(order[0]);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    next(err);
  }
});

// add item to cart
router.post("/", requireToken, async (req, res, next) => {
  try {
    // make sure this is a logged in user
    if (req.user) {
      // get the user's cart so we can extract orderId
      const order = await Order.findOne({
        where: {
          userId: req.user.id,
          status: "active",
        },
        attributes: ["id"],
      });
      // set orderId from order above
      const orderId = order.id;
      // console.log("orderId", orderId);

      // convert req.body (online cart) into array
      const itemToAdd = req.body;
      // console.log("webCart", webCart);

      // for each item in the webCart, we want to create a row in order_products
      // or update the quantity and unit_price accordingly

      console.log("ITEM ID-->", itemToAdd.id, typeof itemToAdd.id);
      // see if the product is already in the db cart
      const existingItem = await Order_Product.findOne({
        where: {
          orderId: orderId,
          productId: itemToAdd.id,
        },
      });
      // console.log("existingItem", existingItem);
      // console.log(typeof existingItem);
      if (existingItem === null) {
        // console.log("ITEM ID IN NEW-->", item.id);
        await Order_Product.create({
          productId: itemToAdd.id,
          orderId: orderId,
          unit_price: parseFloat(itemToAdd.price),
          quantity: itemToAdd.qty,
        });
      } else {
        // console.log("ITEM ID IN UPDATE-->", item.id);
        await existingItem.update({
          unit_price: parseFloat(itemToAdd.price),
          quantity: itemToAdd.qty,
        });
        // console.log("updatedItem-->", updatedItem);
      }

      res.sendStatus(202);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    next(err);
  }
});

router.put("/close", requireToken, async (req, res, next) => {
  try {
    // make sure this is a logged in user
    if (req.user) {
      // get the user's cart so we can extract orderId
      const order = await Order.findOne({
        where: {
          userId: req.user.id,
          status: "active",
        },
        attributes: ["id"],
      });

      // set userId from requireToken check
      const userId = req.user.id;

      //  update cart's order.status to closed
      await order.update({ status: "closed" });

      // create new active order (cart) for the user; empty
      const newOrder = await Order.create({ status: "active" });
      newOrder.setUser(await User.findByPk(userId));

      res.status(201).send(newOrder);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    next(err);
  }
});

// edit current cart's product(s)
router.put("/:productId", requireToken, async (req, res, next) => {
  try {
    // make sure this is a logged in user
    if (req.user) {
      // get the user's cart so we can extract orderId
      const order = await Order.findOne({
        where: {
          userId: req.user.id,
          status: "active",
        },
        attributes: ["id"],
      });
      // set orderId from order above
      const orderId = order.id;
      // console.log("orderId", orderId);

      // convert req.body (edited item) into array
      const editedItem = req.body;
      // console.log("editedProduct", editedProduct);

      const existingItem = await Order_Product.findOne({
        where: {
          orderId: orderId,
          productId: req.params.productId,
        },
      });

      if (editedItem.qty <= 0) {
        await existingItem.destroy();
      } else {
        await existingItem.update({
          unit_price: parseFloat(editedItem.price),
          quantity: editedItem.qty,
        });
      }

      res.sendStatus(202);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    next(err);
  }
});

// delete all of a product from the current cart
router.delete("/:productId", requireToken, async (req, res, next) => {
  try {
    // make sure this is a logged in user
    if (req.user) {
      // get the user's cart so we can extract orderId
      const order = await Order.findOne({
        where: {
          userId: req.user.id,
          status: "active",
        },
        attributes: ["id"],
      });
      // set orderId from order above
      const orderId = order.id;
      // console.log("orderId", orderId);

      const existingItem = await Order_Product.findOne({
        where: {
          orderId: orderId,
          productId: req.params.productId,
        },
      });

      console.log(existingItem);

      await existingItem.destroy();

      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    next(err);
  }
});
