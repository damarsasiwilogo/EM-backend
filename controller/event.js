const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { Account, Referral, Event } = require("../models");
const { Op } = require("sequelize");
const event = require("../models/event");

exports.handleCreateEvent = async (req, res) => {
  const {
    eventName,
    accountId,
    type,
    location,
    description,
    date_time,
    silver_ticket_price,
    gold_ticket_price,
    premium_ticket_price,
  } = req.body;
  const { filename } = req.file;

  try {
    const event = await Event.create({
      eventName,
      accountId,
      type,
      location,
      description,
      date_time,
      silver_ticket_price,
      gold_ticket_price,
      premium_ticket_price,
      event_img: filename,
    });

    res.json({
      ok: true,
      data: {
        eventName: event.eventName,
        accountId: event.accountId,
        type: event.type,
        location: event.location,
        description: event.description,
        date_time: event.date_time,
        silver_ticket_price: event.silver_ticket_price,
        gold_ticket_price: event.gold_ticket_price,
        premium_ticket_price: event.premium_ticket_price,
        event_img: event.event_img,
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

exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.findAll({
      include: [
        {
          model: Account,
          attributes: ["username"],
        },
      ],
    });
    //transform the data
    const responseObj = events.map((event) => ({
      eventName: event.name,
      accountId: event.accountId,
      type: event.type,
      location: event.location,
      description: event.description,
      date_time: event.date_time,
      silver_ticket_price: event.silver_ticket_price,
      gold_ticket_price: event.gold_ticket_price,
      premium_ticket_price: event.premium_ticket_price,
      event_img: event.event_img,
    }));

    res.status(200).json({
      ok: true,
      data: responseObj,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: String(error),
    });
  }
};
