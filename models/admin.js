
module.exports = (sequelize, type) => sequelize.define('admin', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    }  }
    , { sequelize, modelName: 'user' }
    );