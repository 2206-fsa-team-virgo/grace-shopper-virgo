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

// edit current cart >>> needs logic for removing item?
router.put("/", requireToken, async (req, res, next) => {
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
      const webCart = Object.values(req.body);
      // console.log("webCart", webCart);

      // for each item in the webCart, we want to create a row in order_products
      // or update the quantity and unit_price accordingly
      await webCart.forEach(async (item) => {
        console.log("ITEM ID-->", item.id, typeof item.id);
        // see if the product is already in the db cart
        const existingItem = await Order_Product.findOne({
          where: {
            orderId: orderId,
            productId: item.id,
          },
        });
        // console.log("existingItem", existingItem);
        // console.log(typeof existingItem);
        if (existingItem === null) {
          // console.log("ITEM ID IN NEW-->", item.id);
          await Order_Product.create({
            productId: item.id,
            orderId: orderId,
            unit_price: parseFloat(item.price),
            quantity: item.qty,
          });
          // console.log("newItem-->", newItem);
        } else {
          // console.log("ITEM ID IN UPDATE-->", item.id);
          if (item.qty <= 0) {
            await existingItem.destory();
          } else {
            await existingItem.update({
              unit_price: parseFloat(item.price),
              quantity: item.qty,
            });
          }
          // console.log("updatedItem-->", updatedItem);
        }
      });

      let updatedOrder = await Order.findOne({
        include: {
          model: Product,
          attributes: ["id", "name", "desc", "onSale"],
          through: {
            attributes: ["quantity", "unit_price"],
          },
        },
        where: {
          id: orderId,
        },
        attributes: ["id", "status"],
      });

      console.log(updatedOrder);

      res.status(202).send(updatedOrder);
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
