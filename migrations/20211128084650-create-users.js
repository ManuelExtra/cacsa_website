'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      first_name: {
        type: Sequelize.STRING
      },
      last_name: {
        type: Sequelize.STRING
      },
      user_no: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      tel: {
        type: Sequelize.STRING
      },
      campus_home_address: {
        type: Sequelize.TEXT
      },
      home_address: {
        type: Sequelize.TEXT
      },
      state: {
        type: Sequelize.STRING
      },
      country: {
        type: Sequelize.STRING
      },
      dob: {
        type: Sequelize.DATE
      },
      gender: {
        type: Sequelize.STRING
      },
      dept: {
        type: Sequelize.STRING
      },
      level: {
        type: Sequelize.STRING
      },
      programme: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      profile_picture: {
        type: Sequelize.STRING
      },
      units: {
        type: Sequelize.STRING
      },
      role: {
        type: Sequelize.STRING
      },
      email_verified: {
        type: Sequelize.INTEGER
      },
      status: {
        type: Sequelize.INTEGER
      },
      token: {
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
    await queryInterface.dropTable('Users');
  }
};