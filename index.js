const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const morgan = require("morgan");
const keys = require("./config/keys");
require("./models/User");
require("./models/Survey");
require("./services/passport");
require("./services/Mailer");

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
app.use(express.json());

require("./routes/authRoutes")(app);
require("./routes/billingRoutes")(app);
require("./routes/surveyRoutes")(app);

if (process.env.NODE_ENV == "production") {
  app.use(express.static("/client/build"));

  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("SERVER IS ON IN PORT :", PORT);
});
