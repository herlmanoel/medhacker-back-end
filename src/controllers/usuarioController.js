const knex = require('../../database/connection');
const usuariosTable = knex('usuarios');
const bcrypt = require('bcrypt');
const { gerarToken } = require('../utils/gerarToken');

const postUsers = async (req, res, next) => {
  let dados = req.body;

  console.debug('dados form: ', dados);

  try {
    const hash = await bcrypt.hash(dados.senha, 10);
    dados.senha = hash;

    const data = await usuariosTable.where('email', dados.email);

    // if (data.length != 0) {
    //   return res.status(400).json({ error: 'Email já cadastrado. Por favor, tente outro email.' });
    // }

    const result = await usuariosTable.insert(dados)
      // .catch(err => {
      //   console.error(err);
      //   return res.status(400).send({ error: 'Usuário não adicionado' })
      // });
    return res.json({ success: true, message: 'ok' });
  } catch (error) {
    console.error(error);
    return res.status(400).send({ error: 'Usuário não adicionado' });
  }
}

const getUsers = async (req, res, next) => {
  const data = await knex.column(['id', 'nome', 'permissao', 'senha', 'email', 'created_at', ]).select().from('usuarios');
  // console.log(data);
  return res.status(200).json(data);
}

const getUser = async (req, res, next) => {
  const usuarioId = req.params.id;

  try {
    const [usuario] = await usuariosTable.where('id', usuarioId).returning('*');

    if (!usuario) {
      return res.status(401).json({ error: 'O usuário não existe no banco de dados.' });
    }

    usuario.senha = undefined;
    return res.status(200).json(usuario);
  } catch (error) {
    return res.status(401).json({ error: 'Erro ao buscar usuário no banco de dados.' });
  }
}

const putUser = async (req, res, next) => {
  const usuarioId = req.params.id;
  let props = req.body;
  try {
    props.updated_at = Date.now();

    const usuario = await usuariosTable
      .where('id', usuarioId)
      .update(props);
    return res.status(200).json(usuario);
  } catch (error) {
    return res.status(401).json({ error: 'Erro ao alterar.' });
  }
}

const deleteUser = async (req, res, next) => {
  const usuarioId = req.params.id;

  try {
    await usuariosTable
      .where('id', usuarioId)
      .del();
    res.status(200).json({ mensage: 'Usuário deletado.' });
  } catch (error) {
    return res.status(401).json({ error: 'Erro ao deletar.' });
  }
}

module.exports = {
  postUsers,
  getUsers,
  getUser,
  putUser,
  deleteUser
}