'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Contents_details', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      content_id: {
        type: Sequelize.INTEGER
      },
      info: {
        type: Sequelize.STRING
      },
      image: {
        type: Sequelize.STRING
      },
      slide: {
        type: Sequelize.INTEGER
      },
      caption_title: {
        type: Sequelize.STRING
      },
      caption_body: {
        type: Sequelize.TEXT
      },
      link: {
        type: Sequelize.STRING
      },
      link_text: {
        type: Sequelize.STRING
      },
      visibility: {
        type: Sequelize.INTEGER
      },
      icon: {
        type: Sequelize.STRING
      },
      icon_title: {
        type: Sequelize.STRING
      },
      icon_link: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Contents_details');
  }
};