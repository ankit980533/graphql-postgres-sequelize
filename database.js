
const {Sequelize}=require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize({
  dialect: 'postgres',
  
  username: 'postgres',
  host: 'localhost' ,
     database: 'postgres',
     password: 'Ankit@1908',
     port: 5432,
});

module.exports=sequelize;