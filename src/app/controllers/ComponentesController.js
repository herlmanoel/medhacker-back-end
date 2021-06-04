const Database = require("../database");
const Componentes = require("../models/Componentes");

class ComponentesGrupoController {
  postComponenteGrupos = async (req, res, next) => {
    const dataComponenteGrupo = req.body;

    console.log(dataComponenteGrupo);

    try {
      const componenteGrupo = await Componentes.create(
        dataComponenteGrupo
      ).catch((res) => console.error(res));

      return res.status(200).json(componenteGrupo);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro ao cadastrar componente do grupo." });
    }
  };

  // passando o grupoId via param URL
  getComponentesGrupo = async (req, res, next) => {
    const grupoId = req.params.id_grupo;
    try {
      const componenteGrupo = await Componentes.findAll({
        where: { id: grupoId },
      });
      return res.status(200).json(componenteGrupo);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "Erro ao buscar todos os componentes do grupo." });
    }
  };

  getTodosComponentesGrupo = async (req, res, next) => {
    const grupoId = req.params.id_grupo;
    console.log(grupoId);
    try {
      const componenteGrupo = await Componentes.findAll({
        where: { id_grupo: grupoId },
      });
      return res.status(200).json(componenteGrupo);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "Erro ao buscar todos os componentes do grupo." });
    }
  };

  getComponenteGrupo = async (req, res, next) => {
    const componenteGrupoId = req.params.id_grupo;
    try {
      const componenteGrupo = await Componentes.findByPk(componenteGrupoId);
      return res.status(200).json(componenteGrupo);
    } catch (error) {
      return res
        .status(401)
        .json({ error: "Erro ao buscar o Componente do Grupo." });
    }
  };

  putComponenteGrupos = async (req, res, next) => {
    const componenteGrupoId = req.params.id_grupo;
    const dataComponenteGrupo = req.body;
    try {
      const componenteGrupo = await Componentes.findByPk(componenteGrupoId);

      componenteGrupo.nome = dataComponenteGrupo.nome;
      componenteGrupo.email = dataComponenteGrupo.email;

      await componenteGrupo.save();
      return res.status(200).json({ componenteGrupo });
    } catch (error) {
      console.log(error);
      return res
        .status(400)
        .json({ error: "Erro ao alterar Componente do Grupo." });
    }
  };

  deleteComponenteGrupo = async (req, res, next) => {
    const componenteGrupoId = req.params.id_grupo;
    try {
      const componenteGrupo = await Componentes.findByPk(componenteGrupoId);
      await componenteGrupo.destroy();
      res.status(200).json({ mensage: "Componente do Grupo deletado." });
    } catch (error) {
      return res
        .status(401)
        .json({ error: "Erro ao deletar Componente do Grupo." });
    }
  };
}

module.exports = new ComponentesGrupoController();
