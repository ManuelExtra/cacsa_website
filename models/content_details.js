'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Content_details extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Content_details.init({
    content_id: DataTypes.INTEGER,
    info: DataTypes.STRING,
    image: DataTypes.STRING,
    slide: DataTypes.INTEGER,
    caption_title: DataTypes.STRING,
    caption_body: DataTypes.TEXT,
    link: DataTypes.STRING,
    link_text: DataTypes.STRING,
    visibility: DataTypes.INTEGER,
    icon: DataTypes.STRING,
    icon_title: DataTypes.STRING,
    icon_link: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Content_details',
  });
  return Content_details;
};