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
    const {isAdmin}=data
    if (isAdmin){
      try {
        const isDeleted = await User.destroy({where:{username:req.body.username}})
        console.log(isDeleted)
        if(isDeleted){
          return res.status(200).send({message:"user has been deleted"})
        } 
        res.status(404).send({message:"user is not found"})
      } catch (error) {
        res.status(500).send()        
      }
    }
    else{
      return res.status(403).send()
    }
    
  })(req, res, next);
});

module.exports = router;
