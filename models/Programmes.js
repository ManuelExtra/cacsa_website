'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Programmes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Programmes.init({
    name: DataTypes.STRING,
    unit_id: DataTypes.INTEGER,
    day: DataTypes.STRING,
    time: DataTypes.STRING,
    image: DataTypes.STRING,
    description: DataTypes.TEXT,
    venue: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Programmes',
  });
  return Programmes;
};