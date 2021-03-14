const Database = require('../database');
const Evento = require('../models/Evento');
const bcrypt = require('bcrypt');
const { gerarToken } = require('../../utils/gerarToken');

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

      evento.addUsuario(10).catch(err => console.log(err));

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

    try {
      const evento = await Evento.findOne({ id: eventoId });
      evento.nome = props.nome;
      evento.endereco = props.endereco;
      evento.logo = props.logo;
      evento.inicio = props.inicio;
      evento.fim = props.fim;

      props.updated_at = Date.now();

      evento.save();
      return res.status(200).json(evento);
    } catch (error) {
      return res.status(401).json({ error: 'Erro ao alterar.' });
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
}

module.exports = new EventoController;