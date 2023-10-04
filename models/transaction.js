'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Transaction.init({
    referral_id: DataTypes.INTEGER,
    account_id: DataTypes.INTEGER,
    event_id: DataTypes.INTEGER,
    payment_method: DataTypes.INTEGER,
    transaction_date: DataTypes.DATE,
    ticket_type: DataTypes.STRING,
    quantity_total: DataTypes.INTEGER,
    total_price: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Transaction',
  });
  return Transaction;
};