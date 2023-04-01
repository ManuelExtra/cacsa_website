const Sequelize = require('sequelize');
module.exports = new Sequelize('heroku_0cbc024f1e49f4a', 'bb7c257fb7b29d', 'e7092645', {
    host: 'us-cdbr-east-04.cleardb.com',
    dialect: 'mysql',
  
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    },
  
});
