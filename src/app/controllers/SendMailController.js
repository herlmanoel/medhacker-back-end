const bcrypt = require("bcrypt");
const { gerarToken } = require("../../utils/gerarToken");
const Database = require("../database");
const Usuario = require("../models/Usuario");
const Evento = require("../models/Evento");
const UltilsModel = require("../../utils/models");
const { QueryTypes, Op } = require("sequelize");

class SendMailController {
  emailCreateGroup = async (req, res, next) => {
    const { email } = req.body;
  };
}

module.exports = new SendMailController();
