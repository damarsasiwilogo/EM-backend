const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { Account, Referral } = require("../models");
const { Op } = require("sequelize");
const hbs = require("handlebars");
const fs = require("fs");
const mailer = require("../lib/nodemailer");

const JWT_SECRET_KEY = "ini_JWT_loh";

exports.handleRegister = async (req, res) => {
  const {
    username,
    email,
    password,
    firstName,
    lastName,
    phoneNumber,
    accountType,
  } = req.body;

  const existingAccount = await Account.findOne({
    where: {
      [Op.or]: [{ username }, { email }, { phoneNumber }],
    },
  });

  if (existingAccount) {
    return res.status(400).json({
      ok: false,
      message: "Username, email or phone number is already registered",
    });
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const referral = await Referral.create({
      code: "EM-" + username.toUpperCase(),
    });

    const result = await Account.create({
      username,
      email,
      password: hashPassword,
      firstName,
      lastName,
      phoneNumber,
      accountType,
      referralId: referral.id,
    });

    const templateRaw = fs.readFileSync(
      __dirname + "/../template/template.html",
      "utf8"
    );

    const templateCompile = hbs.compile(templateRaw);
    const emailHTML = templateCompile({
      firstName: result.firstName,
    });
    const resultEmail = await mailer.sendMail({
      to: result.email,
      from: process.env.SMTP_USER,
      subject: "Verify your email to complete registration",
      html: emailHTML,
    });

    res.json({
      ok: true,
      data: {
        username: result.username,
        email: result.email,
        firstName: result.firstName,
        lastName: result.lastName,
        referralCode: "EM-" + result.username.toUpperCase(),
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

exports.handleLogin = async (req, res) => {
  const { identity: identity, password } = req.body;
  try {
    const account = await Account.findOne({
      where: {
        [Op.or]: {
          username: identity,
          email: identity,
          password: identity,
        },
      },
      include: [
        {
          model: Referral,
          attributes: ["code"],
        },
      ],
    });

    if (!account) {
      res.status(401).json({
        ok: false,
        message: "Your username/password is incorrect",
      });
      return;
    }

    const isValid = await bcrypt.compare(password, account.password);
    if (!isValid) {
      res.status(403).json({
        ok: false,
        message: "Your username/password is incorrect",
      });
      return;
    }

    const payload = { id: account.id, accountType: account.accountType };
    const token = jwt.sign(payload, JWT_SECRET_KEY, {
      expiresIn: "1h",
    });

    const response = {
      token,
      profile: {
        firstName: account.firstName,
        lastName: account.lastName,
        username: account.username,
        email: account.email,
        phoneNumber: account.phoneNumber,
        referralCode: account.Referral.code,
        accountType: account.accountType,
      },
    };

    res.status(200).json({
      ok: true,
      data: response,
    });
  } catch (err) {
    res.status(500).json({
      ok: false,
      message: String(err),
    });
  }
};
