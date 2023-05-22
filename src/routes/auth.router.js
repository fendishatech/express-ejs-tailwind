const router = require("express").Router();

router.get("/", (req, res) => {
  return res.sendFile("/src/views/");
});

module.exports = router;
