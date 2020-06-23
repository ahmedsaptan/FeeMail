const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const morgan = require("morgan");
const keys = require("./config/keys");
require("./models/User");
require("./services/passport");

mongoose
  .connect("mongodb://localhost:27017/emaily", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("CONNECTED");
  })
  .catch((e) => {
    console.log(e);
  });

const app = express();

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookiekey],
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(morgan("tiny"));

require("./routes/authRoutes")(app);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("SERVER IS ON IN PORT :", PORT);
});
