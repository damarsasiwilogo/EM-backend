const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { Account, Referral } = require("../models");
const { Op } = require("sequelize");

exports.createEvent = async (req, res) => {
  const { eventName, accountId, location, description, date_time, event_img } =
    req.body;

  try {
    const result = await Event.create(
      eventName,
      accountId,
      location,
      description,
      date_time,
      event_img
    );

    res.json({
      ok: true,
      data: {
        eventName: result.eventName,
        accountId: result.accountId,
        location: result.location,
        description: result.description,
        date_time: result.date_time,
        event_img: result.event_img,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      ok: false,
      message: String(err),
    });
  }
};
