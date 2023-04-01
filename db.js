const Sequelize = require('sequelize');
module.exports = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 5000,
        evict: 5000
    },
    timezeone: 'Africa/Lagos'
});