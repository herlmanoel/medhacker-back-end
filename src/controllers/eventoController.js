const knex = require('../../database/connection');
const eventoTable = knex('eventos');
const bcrypt = require('bcrypt');
const { gerarToken } = require('../utils/gerarToken');

const postEventos = async (req, res, next) => {
  const dados = req.body;
  console.log(dados);

  const test = await eventoTable.where('codigo', dados.codigo);
  if(test) {
    res.status(400).json({ success: false, message: 'O código já existe.' });
  }

  // const hash = await bcrypt.hash(dados.senha, 10);
  // dados.senha = hash;

  const event = {
    codigo: dados.codigo,
    endereco: dados.endereco,
    fim: dados.fim,
    inicio: dados.inicio,
    logo: dados.logo,
    nome: dados.nome,
  }
  console.log(event)

  try {
    const [eventoId] = await eventoTable.insert(event);
    const token = await gerarToken({ id: eventoId });

    return res.json({
      buscar: `localhost:3333/eventos/${eventoId}`,
      token
    });
  } catch (err) {
      console.log(err)
  }
}

const getEventos = async (req, res, next) => {
  await knex.select('*').from('eventos')
    .then((data) => res.json(data))
    .catch((err) => console.error(err));
}

const getEvento = async (req, res, next) => {
  const eventoId = req.params.id;
  const [usuario] = await eventoTable.where('id', eventoId);
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
