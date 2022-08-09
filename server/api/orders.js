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
      // set userId from requireToken check
      const userId = req.user.id;
      // console.log("orderId", orderId, "userId", userId);

      // convert req.body (online cart) into array
      const webCart = Object.values(req.body);
      console.log("webCart", webCart);

      // for each item in the webCart, we want to create a row in order_products
      // or update the quantity and unit_price accordingly
      webCart.forEach(async (item) => {
        console.log("ITEM ID-->", item.id, typeof item.id);
        const existingItem =
          (await Order_Product.findOne({
            where: {
              orderId: orderId,
              productId: item.id,
            },
          })) || "no"; // there's gotta be a better way
        console.log("existingItem", existingItem);
        console.log(typeof existingItem);
        if (existingItem === "no") {
          console.log("ITEM ID IN NEW-->", item.id);
          const newItem = await Order_Product.create({
            productId: item.id,
            orderId: orderId,
            unit_price: parseFloat(item.price),
            quantity: item.qty,
          });
          console.log("newItem-->", newItem);
        } else {
          console.log("ITEM ID IN UPDATE-->", item.id);
          const updatedItem = await existingItem.update({
            unit_price: parseFloat(item.price),
            quantity: item.qty,
          });
          console.log("updatedItem-->", updatedItem);
        }
      });

      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    next(err);
  }
});
