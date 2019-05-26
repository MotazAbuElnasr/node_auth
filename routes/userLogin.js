const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken')
const passport = require("../config/passport");
const jwtSecret = require("../config/jwtConf");
const User = require("../sequelize");

router.post("/", async (req, res, next) => {
  passport.authenticate("login", async (err, user, message) => {
    if (err) {
      console.error(err);
    }
    if (message) {
      return res.status(403).send(message);
    }
    const {username} = req.body;
    req.logIn(user , async ()=>{

        try {
            const user = await User.findOne({where:{username}});
            const token = jwt.sign({id:user.id},jwtSecret.secret)
            res.status(200).send({token,auth:true,message: "Logged in"});
        } catch (error) {
            console.log(error)
            res.status(500);
        }
    })
  })(req, res, next);
});

module.exports = router;
