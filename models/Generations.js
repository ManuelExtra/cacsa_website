'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Generations extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Generations.init({
    name: DataTypes.STRING,
    from: DataTypes.STRING,
    to: DataTypes.STRING,
    description: DataTypes.TEXT,
    image: DataTypes.STRING,
    head_id: DataTypes.INTEGER,
    status: DataTypes.INTEGER,
    deletedAt: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Generations',
  });
  return Generations;
};