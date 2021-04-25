const Database = require('../database');
const Grupo = require('../models/Grupo');
const bcrypt = require('bcrypt');
const { QueryTypes, Op } = require('sequelize');

class GrupoController {

  postGrupo = async (req, res, next) => {
    const dados = req.body;

    try {
      const hash = await bcrypt.hash(dados.senha, 10);
      dados.senha = hash;

      const grupo = await Grupo.create(dados)
        .catch(err => {
          console.log(err);
          res.json({ error: 'erro' });
        });

      return res.status(200).json(grupo);
    } catch (error) {
      console.error(error);
      return res.status(400).json({ message: 'Erro ao cadastrar Grupo.' });
    }

  }

  getGrupos = async (req, res, next) => {
    const grupos = await Grupo.findAll();
    return res.status(200).json(grupos);
  }

  getGruposByEventoId = async (req, res, next) => {
    const eventoId = req.params.id;

    const grupos = await Grupo.findAll({ where: { id_evento: eventoId } });
    return res.status(200).json(grupos);
  }


  getGrupo = async (req, res, next) => {
    const grupoId = req.params.id;

    try {
      const grupo = await Grupo.findOne({ id: grupoId });
      // grupo.senha = undefined;

      return res.status(200).json(grupo);
    } catch (error) {
      console.error(error);
      return res.status(401).json({ message: 'Erro ao buscar grupo.' });
    }
  }

  putGrupo = async (req, res, next) => {
    // params = dado da URL
    const grupoId = req.params.id;

    let data = req.body;

    try {
      const grupo = await Grupo.findByPk(grupoId);

      grupo.nome = data.nome;
      grupo.senha = data.senha;
      grupo.username = data.username;
      grupo.descricao = data.descricao;

      await grupo.save();
      return res.status(200).json({ message: 'Grupo alterado.' });
    } catch (error) {
      console.log(error)
      return res.status(400).json({ error: 'Erro ao alterar.' });
    }
  }

  deleteGrupo = async (req, res, next) => {
    const grupoId = req.params.id;
    try {
      const grupo = await Grupo.findOne({ id: grupoId });
      await grupo.destroy();
      res.status(200).json({ message: 'Grupo deletado.' });
    } catch (error) {
      console.log(error);
      return res.status(401).json({ message: 'Erro ao deletar.' });
    }
  }

  getGrupoByName = async (req, res, next) => {
    const pesquisa = req.params.campo;
    try {
      const grupos = await Grupo.findAll({
        where: {
          nome: {
            [Op.like]: `%${pesquisa}%`,
          }
        },
      })
        .catch(err => console.log(err));
      return res.status(200).json(grupos);
    } catch (error) {
      console.error(error);
      return res.status(401).json({ message: 'Erro ao buscar grupo pelo nome.' });
    }

  }

  getGruposByEventoIdWhitLimitAndOffset = async (req, res, next) => {
    const eventoId = req.params.id;
    const limit = parseInt(req.params.limit);
    const offset = parseInt(req.params.offset);

    const group = await Grupo.findAndCountAll({
      offset,
      limit,
      where: { id_evento: eventoId }
    });

    const response = {
      count: group.count,
      groups: group.rows
    }

    return res.status(200).json(response);
  }
}

module.exports = new GrupoController;