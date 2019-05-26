var express = require("express");
var router = express.Router();
const registerUser = require('./registerUser')
const userLogin = require('./userLogin')
const deleteUser = require('./deleteUser')
router.use('/register',registerUser)
router.use('/login',userLogin)
router.use('/delete-user',deleteUser)




module.exports = router;
