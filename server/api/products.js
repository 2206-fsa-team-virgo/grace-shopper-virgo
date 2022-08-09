const router = require("express").Router();
const {
  models: { Product }
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

router.get("/", async (req, res, next) => {
  try {
    const products = await Product.findAll();
    res.send(products);
  } catch (err) {
    next(err);
  }
});

router.get("/:productId", async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.productId);
    res.status(200).send(product);
  } catch (err) {
    next(err);
  }
});

router.post("/", requireToken, async (req, res, next) => {
  try {
    if (req.user.isAdmin) {
      res.status(201).send(await Product.create(req.body));
    }
  } catch (err) {
    next(err);
  }
});

router.put("/:id", requireToken, async (req, res, next) => {
  try {
    if (req.user.isAdmin) {
      const product = await Product.findByPk(req.params.id);
      res.send(await product.update(req.body));
    }
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", requireToken, async (req, res, next) => {
  try {
    if (req.user.isAdmin) {
      const product = await Product.findByPk(req.params.id);
      await product.destroy();
      res.send(product);
    }
  } catch (err) {
    next(err);
  }
});
