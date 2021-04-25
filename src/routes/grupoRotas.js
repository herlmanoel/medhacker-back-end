const router = require('express').Router();
const autenticacaoMiddleware = require('../app/middleware/autenticacaoMiddleware');

const GrupoController = require('../app/controllers/GrupoController');

router.use(autenticacaoMiddleware);

router.route('/grupos')
  .post(GrupoController.postGrupo)
  .get(GrupoController.getGrupos)

router.route('/grupospelotitulo/:campo')
  .get(GrupoController.getGrupoByName)

  router.route('/gruposporevento/:id')
    .get(GrupoController.getGruposByEventoId);

router.route('/grupos/:id')
  .get(GrupoController.getGrupo)
  .put(GrupoController.putGrupo)
  .delete(GrupoController.deleteGrupo);

  router.route('/gruposlimit/:id/:limit/:offset')
  .get(GrupoController.getGruposByEventoIdWhitLimitAndOffset);

module.exports = router;