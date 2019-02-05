'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: { msg: "must be a valid email" }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      allowNull: false,
      defaultValue: 'member',
      type: DataTypes.STRING
    }
  }, {});
  User.associate = function(models) {
    
    User.hasMany(models.Post, {
      foreignKey: "userId",
      as: "posts"
    });

    User.hasMany(models.Comment, {
      foreignKey: "userId",
      as: "comments"
    })
    
  };
  User.prototype.isAdmin = function() {
    return this.role === "admin";
  };

  return User;
};