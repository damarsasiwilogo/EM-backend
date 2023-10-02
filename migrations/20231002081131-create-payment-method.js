'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('PaymentMethods', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      card_number: {
        type: Sequelize.STRING
      },
      card_holder: {
        type: Sequelize.STRING
      },
      card_year: {
        type: Sequelize.STRING
      },
      card_month: {
        type: Sequelize.STRING
      },
      card_cvv: {
        type: Sequelize.STRING
      },
      va_number: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('PaymentMethods');
  }
};