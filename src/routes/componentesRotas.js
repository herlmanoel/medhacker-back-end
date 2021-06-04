const router = require("express").Router();

const ComponentesController = require("../app/controllers/ComponentesController");

const autenticacaoMiddleware = require("../app/middleware/autenticacaoMiddleware");

// router.use(autenticacaoMiddleware);

router
  .route("/componentesGrupo")
  .post(ComponentesController.postComponenteGrupos)
  .get(ComponentesController.getComponentesGrupo);

router
  .route("/componentesGrupo/:id_grupo")
  .get(ComponentesController.getComponenteGrupo)
  .put(ComponentesController.putComponenteGrupos)
  .delete(ComponentesController.deleteComponenteGrupo);

router
  .route("/todosComponentesGrupo/:id_grupo")
  .get(ComponentesController.getTodosComponentesGrupo);

module.exports = router;
