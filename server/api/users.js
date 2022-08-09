const router = require("express").Router();
const {
  models: { User }
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

router.get("/", requireToken, async (req, res, next) => {
  try {
    if (req.user.isAdmin) {
      const users = await User.findAll();
      res.json(users);
    } else {
      res.sendStatus(403);
    }
  } catch (err) {
    next(err);
  }
});

router.get("/:userId", requireToken, async (req, res, next) => {
  try {
    if (req.user.isAdmin) {
      const user = await User.findByPk(req.params.userId);
      res.status(200).send(user);
    } else {
      res.sendStatus(403);
    }
  } catch (err) {
    next(err);
  }
});
