'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let users = [];
    users.push({
      first_name: "admin",
      user_no: "828939922991344",
      last_name: "Cacsa",
      role: "admin",
      gender: "male",
      email: "admin@cacsafpi.com",
      tel: "+234908588848",
      password: "$2a$10$SJOPoeZoioNemIGSKkcN1OcuV61TAnizlPvQVUvXVXH.yaLMTgVVi",
      country: "Nigeria",
      state: "",
      createdAt:new Date(),
      updatedAt:new Date(),
      email_verified: 1,
      status: 1
    });
    await queryInterface.bulkInsert('Users',users, {});  
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
