var express = require("express");
var router = express.Router();
const registerUser = require('./registerUser')
const userLogin = require('./userLogin')
router.use('/register',registerUser)
router.use('/login',userLogin)




module.exports = router;
