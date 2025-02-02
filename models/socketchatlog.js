'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SocketChatLog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  SocketChatLog.init({
    message: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'SocketChatLog',
  });
  return SocketChatLog;
};