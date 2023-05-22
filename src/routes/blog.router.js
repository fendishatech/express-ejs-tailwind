const router = require("express").Router();

router.get("/", (req, res) => {
  return res.render("home/index");
});

module.exports = router;
