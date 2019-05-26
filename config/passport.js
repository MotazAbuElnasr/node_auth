const bcrypt = require("bcrypt");
const Sequelize = require("sequelize");
const jwtSecret = require("./jwtConf");
const BCRYPT_SALT_ROUNDS = 12;
const Op = Sequelize.Op;

const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const JWTstrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
const User = require("../sequelize");

passport.use(
  "register",
  new LocalStrategy(
    {
      session: false,
      passReqToCallback: true
    },
    async (req, username, password, done) => {
      console.log(username);
      console.log("body", req.body);
      const {email} = req.body;
      try {
        const user = await User.findOne({
          where: {
            [Op.or]: [{username}, {email}]
          }
        });
        if (user) {
          return done(null, false, {message: "username or email is already taken"});
        }
        const hashedpassoword = await bcrypt.hash(password, BCRYPT_SALT_ROUNDS);
        const created_user = await User.create({username, email, password: hashedpassoword});
        return done(null, created_user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.use(
  "login",
  new LocalStrategy(
    {
      session: false
    },
    async (username, password, done) => {
        console.log(username)
      try {
          console.log("before user")
        const user = await User.findOne({where:{username,}});
        console.log("found",user)
        if (!user) {
          return done(null, false, {message: "credentials are not correct"});
        }

        const isMatched = await bcrypt.compare(password, user.password);
        if (!isMatched) {
          return done(null, false, {message: "credentials are not correct"});
        }
        console.log("matched")
        return done(null, user);
      } catch (error) {
          console.log(error)
        return done(error);
      }
    }
  )
);
module.exports = passport;
