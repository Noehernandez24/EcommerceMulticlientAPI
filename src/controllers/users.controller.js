const UsersServices = require("../services/users.services");
const HtmlGen = require("../utils/htmlTemplate");
const transporter = require("../utils/mailer");
require("dotenv").config();

const createUser = async (req, res, next) => {
  try {
    const newUser = req.body;
    const user = await UsersServices.create(newUser);
    res.status(201).json(user);

    const { email, username } = user;

    await transporter.sendMail({
      from: process.env.G_USERNAME,
      to: email,
      subject: `Bienvenido! ${username}`,
      html: HtmlGen(username, email),
    });
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const { id } = req.user;
    const userData = req.body;
    await UsersServices.update(id, userData);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createUser,
  updateUser,
};
