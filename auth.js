const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const Person = require("./models/Person");
passport.use(
  new LocalStrategy(async (USERNAME, password, done) => {
    try {
      //   console.log("credential recieved", USERNAME, password);
      const user = await Person.findOne({ username: USERNAME });

      if (!user) {
        return done(null, false, { message: "Incorrect Username" });
      }
      const isPassword = await user.comparePassword(password);
      if (isPassword) {
        return done(null, user);
      } else {
        return done(null, false, { message: "Incorrect Password" });
      }
    } catch (err) {
      return done(err);
    }
  })
);

module.exports = passport;
