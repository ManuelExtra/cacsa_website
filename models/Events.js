'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Events extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Events.init({
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    venue: DataTypes.STRING,
    image: DataTypes.STRING,
    pathname: DataTypes.TEXT,
    event_date: DataTypes.DATE,
    visibility: DataTypes.INTEGER,
    theme: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Events',
  });
  return Events;
};