const router = require("express").Router();
const { User } = require("../models/user");

router.get("/", async (req, res) => {
  try {
    const people = await User.find().sort({ score: -1 });
    res.send(people);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

module.exports = router;
