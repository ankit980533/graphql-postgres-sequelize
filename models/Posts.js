const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const User = require('./Users'); 

const Post = sequelize.define('posts', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

User.hasMany(Post); 
Post.belongsTo(User); 

module.exports = Post;
