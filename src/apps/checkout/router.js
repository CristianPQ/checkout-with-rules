const AsyncRouter = require("express-async-router").AsyncRouter;
const router = AsyncRouter();
const jsonParser = require("body-parser").json();
const { checkout } = require("./controller");

router.use(jsonParser);
router.post("/", async (req, res) => {
  const productCodes = req.body.codes;
  const totalAmount = checkout(productCodes);
  return res.status(200).json({ total: totalAmount });
});

module.exports = router;
