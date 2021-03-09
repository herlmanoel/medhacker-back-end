const router = require('express').Router();

const {
  postUsers,
  getUsers,
  getUser,
  putUser,
  deleteUser
} = require('../controllers/usuarioController');

const autenticacaoMiddleware = require('../middleware/autenticacaoMiddleware');

// router.route('/usuarios')
//   .post(postUsers);

// router.use(autenticacaoMiddleware);

router.route('/usuarios')
  .post(postUsers)
  .get(getUsers);

router.route('/usuarios/:id')
  .get(getUser)
  .put(putUser)
  .delete(deleteUser);

module.exports = router;
