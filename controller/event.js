const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { Account, Referral, Event } = require("../models");
const { Op } = require("sequelize");

exports.handleCreateEvent = async (req, res) => {
  const {
    eventName,
    type,
    location,
    description,
    date_time,
    silver_ticket_price,
    gold_ticket_price,
    premium_ticket_price,
    isActive,
  } = req.body;
  const accountId = req.user.id;
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
      isActive,
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
        isActive: event.isActive,
      },
      msg: "New Event Created!",
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
    const where = {};
    const { eventName } = req.query;
    if (eventName) {
      where.eventName = {
        [Op.like]: `%${eventName}%`,
      };
    }
    const { location } = req.query;
    if (location) {
      where.location = {
        [Op.like]: `%${location}%`,
      };
    }

    where.isActive = {
      [Op.eq]: true,
    };

    const events = await Event.findAll({
      where,
      include: [
        {
          model: Account,
          attributes: ["firstName"],
        },
      ],
    });

    console.log(events);
    //transform the data
    const responseObj = events.map((event) => ({
      eventId: event.id,
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
      isActive: event.isActive,
    }));

    res.status(200).json({
      ok: true,
      data: responseObj,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      ok: false,
      msg: String(error),
    });
  }
};
exports.getEventId = async (req, res) => {
  try {
    const { accountId } = req.params;
    const datas = await Event.findAll({
      where: {
        accountId,
      },
      include: [
        {
          model: Account,
          attributes: ["firstName"],
        },
      ],
    });
    const responseObj = datas.map((event) => ({
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
      createdBy: event.Account.firstName,
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
exports.destroyEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    const data = await Event.findByPk(eventId);

    if (!data.isActive) {
      return res.status(400).json({
        ok: false,
        data: data.dataValues,
        msg: `Cannot Delete data that has been deleted!`,
      });
    }

    data.isActive = false;

    data.save();

    const responseObj = data;

    res.status(200).json({
      ok: true,
      data: responseObj,
      msg: `Delete event with id ${eventId} success!`,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: String(error),
    });
  }
};
