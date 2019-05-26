const bcrypt = require('bcrypt');
const Sequelize = require( 'sequelize')
const jwtSecret = require( './jwtConf')
const BCRYPT_SALT_ROUNDS = 12;
const Op = Sequelize.Op;

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const User = require('../sequelize');


passport.use('register',new LocalStrategy({
    session: false,
    passReqToCallback: true,
    usernameField: 'username',
    passwordField: 'password',
}, async (req, username, password, done) => {
    console.log(username)
    console.log("body",req.body)
    const { email } = req.body
    try {
        const user = await User.findOne({
            where: {
                [Op.or]: [{ username }, { email }]
            }
        })
        if (user){
            return done(null,false,{message:"username or email is already taken"})
        }
        const hashedpassoword = await bcrypt.hash(password, BCRYPT_SALT_ROUNDS);
        const created_user = await User.create({username,email,password:hashedpassoword})
        console.log("user created : ")
        return done(null,created_user)     
    } catch (error) {
        return done(error)
    }

}))

module.exports = passport;
