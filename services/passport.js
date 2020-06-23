const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const { googleClientID, googleClientSecret } = require("../config/keys");

const User = mongoose.model("users");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: googleClientID,
      clientSecret: googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let existingUser = await User.findOne({ googleID: profile.id });

        if (existingUser) {
          return done(null, existingUser);
        }

        let newUser = await new User({ googleID: profile.id }).save();
        done(null, newUser);
      } catch (error) {
        console.log(err.message);
      }
    }
  )
);
