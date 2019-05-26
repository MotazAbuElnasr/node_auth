const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken')
const passport = require("../config/passport");
const jwtSecret = require("../config/jwtConf");
const User = require("../sequelize").User;
const Admin = require("../sequelize").Admin;

router.post("/", async (req, res, next) => {
  passport.authenticate("jwt", {session:false} ,async (err, data, message) => {
    if (err) {
      console.error(err);
      return res.status(500).send()
    }
    if (message) {
      return res.status(403).send(message);
    }
    const {isAdmin,user}=data
  })(req, res, next);
});

module.exports = router;
