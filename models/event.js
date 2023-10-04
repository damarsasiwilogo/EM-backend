"use strict";
const { Model, BOOLEAN } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Event.belongsTo(models.Account, { foreignKey: "accountId" });
      // define association here
    }
  }
  Event.init(
    {
      eventName: DataTypes.STRING,
      accountId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      type: DataTypes.STRING,
      location: DataTypes.STRING,
      description: DataTypes.STRING,
      date_time: DataTypes.DATE,
      silver_ticket_price: DataTypes.INTEGER,
      gold_ticket_price: DataTypes.INTEGER,
      premium_ticket_price: DataTypes.INTEGER,
      event_img: DataTypes.STRING,
      isActive: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Event",
    }
  );
  return Event;
};
