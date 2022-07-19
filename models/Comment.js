const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {}

Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },

    comments: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [2],
      },
    },

    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'posted_by',
      references: {
        model: 'user',
        key: 'id',
      },
    },

    postId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'post',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    freezeTableName: true,
    timestamps: true,
    underscored: true,
    modelName: 'comment',
  }
);
