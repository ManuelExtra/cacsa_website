'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Units_details extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Units_details.init({
    unit_id: DataTypes.INTEGER,
    image: DataTypes.STRING,
    executive_id: DataTypes.INTEGER,
    sub_exco_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    gen_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Units_details',
  });
  return Units_details;
};