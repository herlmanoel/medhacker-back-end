const Database = require('../database');
const Evento = require('../models/Evento');
const bcrypt = require('bcrypt');
const { gerarToken } = require('../../utils/gerarToken');
const { QueryTypes, Op } = require('sequelize');

class EventoController {

  postEventos = async (req, res, next) => {
    let dados = req.body;
    console.log(dados);
    const evento = await Evento
      .create(dados)
      .catch(err => {
        console.log(err);
        res.json({ error: 'erro' });
      });
    return res.status(200).json(evento);
  }

  getEventos = async (req, res, next) => {
    const eventos = await Evento.findAll();
    return res.status(200).json(eventos);
  }

  getEvento = async (req, res, next) => {
    const eventoId = req.params.id;

    try {
      const evento = await Evento.findOne({ id: eventoId });
      evento.senha = undefined;
      return res.status(200).json(evento);
    } catch (error) {
      return res.status(401).json({ error: 'Erro ao buscar evento no banco de dados.' });
    }
  }

  putEvento = async (req, res, next) => {
    const eventoId = req.params.id;
    let props = req.body;
    console.log(props);

    try {
      const evento = await Evento.findByPk(eventoId);

      evento.titulo = props.titulo;
      evento.endereco = props.endereco;
      evento.logo = props.logo;
      evento.inicio = props.inicio;
      evento.fim = props.fim;
      await evento.save();
      return res.status(200).json({ ok: true });
    } catch (error) {
      console.log(error)
      return res.status(400).json({ error: 'Erro ao alterar.' });
    }
  }

  deleteEvento = async (req, res, next) => {
    const eventoId = req.params.id;
    try {
      const user = await Evento.findOne({ id: eventoId });
      await user.destroy();
      res.status(200).json({ mensage: 'Usuário deletado.' });
    } catch (error) {
      return res.status(401).json({ error: 'Erro ao deletar.' });
    }
  }

  getEventosByTitulo = async (req, res, next) => {
    const pesquisa = req.params.campo;
    try {
      const users = await Evento.findAll({
        where: {
          titulo: {
            [Op.like]: `%${pesquisa}%`,
          }
        },
      })
        .catch(err => console.log(err));
      return res.status(200).json(users);
    } catch (error) {
      console.log(error);
      return res.status(401).json({ erro: 'Erro ao buscar evento pelo título.' });
    }

  }

  getEventsWhitLimitAndOffset = async (req, res, next) => {
    const limit = parseInt(req.params.limit);
    const offset = parseInt(req.params.offset);
    const events = await Evento.findAndCountAll({ 
      offset,
      limit 
    });    
    const response = {
      count: events.count,
      events: events.rows
    }

    return res.status(200).json(response);
  }
}

module.exports = new EventoController;