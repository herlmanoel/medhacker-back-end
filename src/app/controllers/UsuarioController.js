const bcrypt = require("bcrypt");
const { gerarToken } = require("../../utils/gerarToken");
const Database = require("../database");
const Usuario = require("../models/Usuario");
const Evento = require("../models/Evento");
const UltilsModel = require("../../utils/models");
const { QueryTypes, Op } = require("sequelize");

class UsuarioController {
  postUsers = async (req, res, next) => {
    const { evento, ...data } = req.body;
    const [id_evento] = evento;
    const dataComplete = { ...data, id_evento };
    try {
      const hash = await bcrypt.hash(data.senha, 10);
      dataComplete.senha = hash;
      const user = await Usuario.create(dataComplete);
      evento && UltilsModel(evento, user);
      const token = gerarToken({ id: dataComplete.id });
      console.log(user);
      return res.status(200).json({ user, token });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ mensage: "Erro ao adicionar usuário." });
    }
  };

  getUsers = async (req, res, next) => {
    const users = await Usuario.findAll();
    return res.status(200).json(users);
  };

  getUsersWhitLimitAndOffset = async (req, res, next) => {
    const limit = parseInt(req.params.limit);
    const offset = parseInt(req.params.offset);

    const users = await Usuario.findAndCountAll({
      offset,
      limit,
    });

    const response = {
      count: users.count,
      users: users.rows,
    };
    return res.status(200).json(response);
  };

  getUser = async (req, res, next) => {
    const usuarioId = req.params.id;
    try {
      const user = await Usuario.findOne({
        where: { id: parseInt(usuarioId) },
        include: "evento",
      });
      console.log("usuarioId", usuarioId);
      // const querySQL =
      //   "SELECT `id_evento` FROM `usuarios_eventos` WHERE `id_usuario` = " +
      //   usuarioId +
      //   ";";
      // const eventosIds = await Usuario.sequelize
      //   .query(querySQL, { type: QueryTypes.SELECT })
      //   .then((response) => console.log('response: ', response))
      //   .catch(() => console.log("ERRO!"));
      // console.log("eventosIds", eventosIds);

      // const IdsEventos = eventosIds.map((e) => e.id_evento);
      return res.status(200).json({ user });
      // const usuarioEventos = {
      //   ...user.dataValues,
      //   IdsEventos,
      // };
      // return res.status(200).json(usuarioEventos);
    } catch (error) {
      return res
        .status(401)
        .json({ error: "Erro ao buscar usuário no banco de dados." });
    }
  };

  putUser = async (req, res, next) => {
    const usuarioId = req.params.id;
    const eventoId = req.params.evento;

    const { evento, ...data } = req.body;
    console.log(req.body);
    console.log(data);
    console.log(evento);

    try {
      const user = await Usuario.findByPk(usuarioId);
      const eventosUsuariosIds = await Usuario.sequelize.query(
        "SELECT `id` FROM `usuarios_eventos` WHERE `id_usuario` = " + usuarioId,
        { type: QueryTypes.SELECT }
      );
      const IdsEventosUsuarios = eventosUsuariosIds[0].id;
      user.evento = IdsEventosUsuarios;
      console.log("--------> " + IdsEventosUsuarios);
      console.log(eventosUsuariosIds);
      const sqlUpdate =
        "UPDATE `usuarios_eventos` SET `id_evento`=" +
        evento +
        ",`id_usuario`=" +
        usuarioId +
        " WHERE `id`= " +
        IdsEventosUsuarios +
        "";
      console.log(sqlUpdate);
      await Usuario.sequelize.query(sqlUpdate, { type: QueryTypes.UPDATE });

      user.nome = data.nome;
      user.senha = data.senha;
      user.email = data.email;
      user.permissao = data.permissao;
      user.updated_at = Date.now();

      console.log(user);
      user.save();
      return res.status(200).json(user);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ error: "Erro ao alterar." });
    }
  };

  deleteUser = async (req, res, next) => {
    const usuarioId = req.body.id;
    try {
      await Usuario.destroy({
        where: {
          id: usuarioId,
        },
      });

      res.status(200).json({ mensage: "Usuário deletado." });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ error: "Erro ao deletar." });
    }
  };

  getUsersByName = async (req, res, next) => {
    const pesquisa = req.params.campo;

    const users = await Usuario.findAll({
      where: {
        nome: {
          [Op.like]: `%${pesquisa}%`,
        },
      },
    }).catch((err) => console.log(err));
    // console.log(users);
    return res.status(200).json(users);
  };
}

module.exports = new UsuarioController();
