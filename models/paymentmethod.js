'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PaymentMethod extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PaymentMethod.init({
    name: DataTypes.STRING,
    card_number: DataTypes.STRING,
    card_holder: DataTypes.STRING,
    card_year: DataTypes.STRING,
    card_month: DataTypes.STRING,
    card_cvv: DataTypes.STRING,
    va_number: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'PaymentMethod',
  });
  return PaymentMethod;
};