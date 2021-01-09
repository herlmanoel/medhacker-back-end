const knex = require('../../database/connection');
const eventoTable = knex('eventos');
const bcrypt = require('bcrypt');
const { gerarToken } = require('../utils/gerarToken');

const postEventos = async (req, res, next) => {
    let dados = req.body;
    console.log(dados);

    const hash = await bcrypt.hash(dados.senha, 10);
    dados.senha = hash;

    const [ eventoId ] = await eventoTable.insert(dados).returning('id');

    const token = await gerarToken({ id: eventoId });
    return res.json({
      buscar: `localhost:3333/usuarios/${eventoId}`,
      token
    });
}
  
  const getEventos = async (req, res, next) => {
    const data = await eventoTable;
    return res.json(data);
  }
  
  const getEvento = async (req, res, next) => {
    const eventoId = req.params.id;
    const [ usuario ] = await eventoTable.where('id', eventoId);
    res.json(usuario);
  }
  
  const putEvento = async (req, res, next) => {
    const eventoId = req.params.id;
    const props = req.body;
    props.updated_at = new Date();
    const usuario = await eventoTable
      .where('id', eventoId)
      .update(props);
    res.status(200).json(usuario);
  }
  
  const deleteEvento = (req, res, next) => {
    const eventoId = req.params.id;
  
    eventoTable
      .where('id', eventoId)
      .del();
      res.status(200).json({ ok: true });
  }
  
  module.exports = {
    postEventos,
    getEventos,
    getEvento,
    putEvento,
    deleteEvento
  }
  