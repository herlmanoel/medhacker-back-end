const router = require("express").Router();
const autenticacaoMiddleware = require("../app/middleware/autenticacaoMiddleware");

const EventoController = require("../app/controllers/EventoController");

router.use(autenticacaoMiddleware);

router.route("/eventos").post(EventoController.postEventos);

router
  .route("/eventos")
  .get(EventoController.getEventos)
  .delete(EventoController.deleteEvento)
  .put(EventoController.putEvento);

router
  .route("/eventospelotitulo/:campo")
  .get(EventoController.getEventosByTitulo);

router
  .route("/eventos/:id")
  .get(EventoController.getEvento)
  .put(EventoController.putEvento)
  .delete(EventoController.deleteEvento);

router
  .route("/eventoslimit/:limit/:offset")
  .get(EventoController.getEventsWhitLimitAndOffset);

router
  .route("/eventosinscabertas")
  .get(EventoController.getOpenRegistrationEvents);

router
  .route("/eventosseminscabertas")
  .get(EventoController.getNotOpenRegistrationEvents);

module.exports = router;
