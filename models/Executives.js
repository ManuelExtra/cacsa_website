'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Executives extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Executives.init({
    generation_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    office_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Executives',
  });
  return Executives;
};