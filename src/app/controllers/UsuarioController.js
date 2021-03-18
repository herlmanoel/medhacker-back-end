const bcrypt = require('bcrypt');
const { gerarToken } = require('../../utils/gerarToken');
const Database = require('../database');
const Usuario = require('../models/Usuario');
const Evento = require('../models/Evento');
const UltilsModel = require('../../utils/models');


class UsuarioController {
  postUsers = async (req, res, next) => {
    const { evento, ...data } = req.body;
    console.log(data);
    console.log(evento);
    const user = await Usuario.create(data);
    if (evento && evento.length > 0) {
      UltilsModel(evento, user);
    }

    return res.status(200).json(user);
  }

  getUsers = async (req, res, next) => {
    const users = await Usuario.findAll();
    return res.status(200).json(users);
  }

  getUser = async (req, res, next) => {
    const usuarioId = req.params.id;
    try {
      // const user = await Usuario.findOne({ where: { id: 1 },
      //   include: [
      //     { model: Evento, as: 'evento', foreignKey: 'id_evento' }
      //   ]
      // }).catch(err => console.log(err));
      // const e = await user.getEvento().catch(err => console.log(err));
      // console.log(e);
      // user.senha = undefined;
      // return res.status(200).json(user);
      await Usuario.findAll({ include: { model: Evento, as: 'evento' } })
        .then(result => console.log(result))
        .catch(err => console.log(err));
      console.log('----------------------');
      return res.status(200).json({ ok: true });
    } catch (error) {
      return res.status(401).json({ error: 'Erro ao buscar usuário no banco de dados.' });
    }
  }

  putUser = async (req, res, next) => {
    const usuarioId = req.params.id;
    const eventoId = req.params.evento;
    let props = req.body;
    console.log(props);

    try {
      const user = await Usuario.findOne({ id: usuarioId });

      user.nome = props.nome;
      user.senha = props.senha;
      user.email = props.email;
      user.permissao = props.permissao;
      props.updated_at = Date.now();

      user.setEvento();
      console.log(user);
      // user.save();
      return res.status(200).json(user);
    } catch (error) {
      return res.status(401).json({ error: 'Erro ao alterar.' });
    }
  }

  deleteUser = async (req, res, next) => {
    // const usuarioId = req.params.id;
    const usuarioId = req.body;
    console.log(usuarioId);
    try {
      const user = await Usuario.findOne({ id: usuarioId });
      await user.destroy();
      res.status(200).json({ mensage: 'Usuário deletado.' });
    } catch (error) {
      return res.status(401).json({ error: 'Erro ao deletar.' });
    }
  }
}

module.exports = new UsuarioController;