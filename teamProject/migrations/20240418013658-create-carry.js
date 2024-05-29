'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Carries', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      order_id: {
        type: Sequelize.STRING(40),
        references: {
          model: 'PaymentRequests',
          key: 'id'
        }
      },
      userName: {
        type: Sequelize.STRING(15)
      },
      address: {
        type: Sequelize.STRING(100)
      },
      progress: {
        type: Sequelize.STRING(30)
      },
      carryStart: {
        type: Sequelize.DATE
      },
      carryEnd: {
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Carries');
  }
};
