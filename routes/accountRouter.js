var express = require("express");
var router = express.Router();
const passport = require("../config/passport");
const User = require("../sequelize");
router.post("/", async (req, res, next) => {
  console.log("registration");
  passport.authenticate("register", async (err, user, message) => {
    console.log(req.body)
    if (err) {
      console.error(err);
    }
    if (message) {
      console.log("object",message)
      return res.status(403).send(message);
    }
    console.log(user);
    const {first_name, last_name, email} = req.body;
    const username = user.username;
    console.log(user)
    console.log(username,"ddddddddDDDDDDd")
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
      console.log("updated_user");
      res.status(200).send({message: "user created"});
    } catch (error) {
      console.log("errrrrrr")
      console.error(error)
      res.send(error)
    }
  })(req, res, next);
});

module.exports = router;
