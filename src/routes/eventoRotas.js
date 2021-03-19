const router = require('express').Router();
// const autenticacaoMiddleware = require('../app/middleware/autenticacaoMiddleware');

const EventoController = require('../app/controllers/EventoController');

// router.use(autenticacaoMiddleware);

router.route('/eventos')
  .get(EventoController.getEventos)
  .post(EventoController.postEventos)
  .delete(EventoController.deleteEvento)
  .put(EventoController.putEvento);
  
  router.route('/eventospelotitulo/:campo')
  .get(EventoController.getEventosByTitulo)

router.route('/eventos/:id')
  .get(EventoController.getEvento)
  .put(EventoController.putEvento)
  .delete(EventoController.deleteEvento);

module.exports = router;