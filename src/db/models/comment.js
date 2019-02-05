'use strict';
module.exports = (sequelize, DataTypes) => {
  var Comment = sequelize.define('Comment', {
    body: {
      allowNull: false,
      type: DataTypes.STRING
    },
    postId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER
    }
  }, {});
  Comment.associate = function(models) {
    
    Comment.belongsTo(models.Post, {
       foreignKey: "postId",
       onDelete: "CASCADE"
     });

     Comment.belongsTo(models.User, {
       foreignKey: "userId",
       onDelete: "CASCADE"
     });

   };
  return Comment;
};