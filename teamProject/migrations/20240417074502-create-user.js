"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Users", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        type: Sequelize.STRING(40),
        // allowNull: false,
      },
      password: {
        type: Sequelize.STRING(20),
        // allowNull: false,
      },
      gender: {
        type: Sequelize.CHAR(1),
        validate: {
          isIn: [["M", "F"]],
        },
      },
      userName: {
        type: Sequelize.STRING(10),
        // allowNull: false,
      },
      email: {
        type: Sequelize.STRING(40),
        // allowNull: false,
      },
      phoneNumber: {
        type: Sequelize.STRING(20),
      },
      mainAddress: {
        type: Sequelize.STRING(100),
      },
      detailAddress: {
        type: Sequelize.STRING(100),
      },
      isMaster: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      isDeleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      profileImg: {
        type: Sequelize.TEXT,
      },
      snsId: {
        type: Sequelize.STRING(100),
      },
      provider: {
        type: Sequelize.STRING(100),
      },
      createdAt: {
        // allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("now"),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Users");
  },
};
