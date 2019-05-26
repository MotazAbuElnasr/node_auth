const express = require('express')
const Cors = require('cors')
const bodyParser = require('body-parser')
const logger = require('morgan')
const passport = require('passport')
const accountRouter = require('./routes/accountRouter')
require('./config/jwtConf')
const app = express();

const API_PORT = process.env.API_PORT || 3001

app.use(Cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(passport.initialize());
app.use(passport.session());

app.use('/accounts', accountRouter);

app.listen(API_PORT,()=>{
    console.log(`Server Started at port ${API_PORT}`);
  });