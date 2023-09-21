var Sequelize = require("sequelize");
var uuid = require("uuid");

const db = require("../database/models/index.js");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await db.user.findAll();

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
}