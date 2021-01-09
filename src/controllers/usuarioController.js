const knex = require('../../database/connection');
const usuariosTable = knex('usuarios');
const bcrypt = require('bcrypt');
const { gerarToken } = require('../utils/gerarToken');

const postUsers = async (req, res, next) => {
    let dados = req.body;
    console.log(dados);

    const hash = await bcrypt.hash(dados.senha, 10);
    dados.senha = hash;

    const [ usuarioId ] = await usuariosTable.insert(dados).returning('id');

    const token = await gerarToken({ id: usuarioId });
    return res.json({
      buscar: `localhost:3333/usuarios/${usuarioId}`,
      token
    });
}
  
  const getUsers = async (req, res, next) => {
    const data = await usuariosTable;
    return res.json(data);
  }
  
  const getUser = async (req, res, next) => {
    const usuarioId = req.params.id;
    const [ usuario ] = await usuariosTable.where('id', usuarioId);
    usuario.senha = undefined;
    res.json(usuario);
  }
  
  const putUser = async (req, res, next) => {
    const usuarioId = req.params.id;
    const props = req.body;
    props.updated_at = new Date();
    const usuario = await usuariosTable
      .where('id', usuarioId)
      .update(props);
    res.status(200).json(usuario);
  }
  
  const deleteUser = (req, res, next) => {
    const usuarioId = req.params.id;
  
    usuariosTable
      .where('id', usuarioId)
      .del();
  }
  
  module.exports = {
    postUsers,
    getUsers,
    getUser,
    putUser,
    deleteUser
  }
  