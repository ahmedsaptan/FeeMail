const keys = require("../config/keys");
const stripe = require("stripe")(keys.stripeSecretKey);
const reuireLogin = require("../middlewares/requireLogin");

module.exports = (app) => {
  app.post("/api/stripe", reuireLogin, async (req, res) => {
    try {
      await stripe.charges.create({
        amount: 500,
        currency: "usd",
        source: req.body.id,
        description: "$5 for 5 credits ",
      });

      req.user.credits += 5;
      const user = await req.user.save();
      res.send(user);
    } catch (error) {
      res.send(error);
    }
  });
};
