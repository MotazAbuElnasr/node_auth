const Sequelize = require('sequelize');
const UserModel = require( './models/user')
const AdminModel = require( './models/admin')

const sequelize = new Sequelize('auth_api', process.env.SQL_USER_NAME, process.env.SQL_PASSWORD, {
  host: 'localhost',
  dialect:'mysql'
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
 
const User = UserModel(sequelize, Sequelize);
const Admin = AdminModel(sequelize, Sequelize);
Admin.belongsTo(User)
sequelize.sync().then(() => {
    console.log('tables created');
  }); 


module.exports = {User,Admin};
