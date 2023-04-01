'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Contents extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Contents.init({
    title: DataTypes.STRING,
    banner: DataTypes.STRING,
    first_content: DataTypes.TEXT,
    second_content: DataTypes.TEXT,
    page: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Contents',
  });
  return Contents;
};