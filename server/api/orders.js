const router = require("express").Router();
const {
  models: { Order, Order_Product },
} = require("../db");
module.exports = router;

// get all orders for a specific user
router.get("/", async (req, res, next) => {
  try {
    const orders = await Order
      .findAll
      // {
      // include: [Order_Product],
      // group: [Order_Product.orderId],
      // where: {
      //   userId: req.params.userId,
      // },
      // }
      ();
    res.status(200).send(orders);
  } catch (err) {
    next(err);
  }
});
