const router = require('express').Router();
const autenticacaoMiddleware = require('../middleware/autenticacaoMiddleware');

const {
  postEventos,
  getEventos,
  getEvento,
  putEvento,
  deleteEvento
} = require('../controllers/eventoController');

// router.use(autenticacaoMiddleware);

router.route('/eventos')
  .post(postEventos);

router.route('/eventos')
  .get(getEventos);

router.route('/eventos/:id')
  .get(getEvento)
  .put(putEvento)
  .delete(deleteEvento);

module.exports = router;
