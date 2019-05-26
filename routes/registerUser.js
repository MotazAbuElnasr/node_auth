var express = require("express");
var router = express.Router();
const passport = require("../config/passport");
const User = require("../sequelize");
router.post("/", async (req, res, next) => {
  console.log("login");
  passport.authenticate("login", async (err, user, message) => {
    if (err) {
      console.error(err);
    }
    if (message) {
      console.log("object",message)
      return res.status(403).send(message);
    }
    const username = user.username;
    try {
       await User.update(
        {
          first_name,
          last_name,
          email
        },
        {
          where: {username}
        }
      );
      res.status(200).send({message: "user created"});
    } catch (error) {
      res.send(error)
    }
  })(req, res, next);
});

module.exports = router;
