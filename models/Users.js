'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Users.init({
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    user_no: DataTypes.STRING,
    email: DataTypes.STRING,
    tel: DataTypes.STRING,
    campus_home_address: DataTypes.TEXT,
    home_address: DataTypes.TEXT,
    state: DataTypes.STRING,
    country: DataTypes.STRING,
    dob: DataTypes.DATE,
    gender: DataTypes.STRING,
    dept: DataTypes.STRING,
    level: DataTypes.STRING,
    programme: DataTypes.STRING,
    password: DataTypes.STRING,
    profile_picture: DataTypes.STRING,
    units: DataTypes.STRING,
    role: DataTypes.STRING,
    email_verified: DataTypes.INTEGER,
    status: DataTypes.INTEGER,
    token: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Users',
  });
  return Users;
};