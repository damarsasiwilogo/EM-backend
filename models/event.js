"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Event.hasOne(models.Event, { foreignKey: "accountId" });
    }
  }
  Event.init(
    {
      eventName: DataTypes.STRING,
      location: DataTypes.STRING,
      description: DataTypes.STRING,
      date_time: DataTypes.STRING,
      event_img: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Event",
    }
  );
  return Event;
};
