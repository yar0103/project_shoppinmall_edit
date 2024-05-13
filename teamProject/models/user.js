"use strict";
const { Model, Sequelize } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        type: DataTypes.STRING(15),
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      gender: {
        type: DataTypes.CHAR(1),
        validate: {
          isIn: [["M", "F"]],
        },
      },
      userName: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(40),
        allowNull: false,
      },
      phoneNumber: {
        type: DataTypes.STRING(20),
      },
      address: {
        type: DataTypes.STRING(100),
      },
      isMaster: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      userImage: {
        type: DataTypes.STRING(100),
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.fn("now"),
      },
    },
    {
      sequelize,
      modelName: "User",
      timestamps: false,
    }
  );

  User.associate = (models) => {
    User.hasMany(models.DeleteUser, {foreignKey : "user_id"})
  }

  return User;
};
