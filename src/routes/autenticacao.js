const router = require('express').Router();

const {
    autenticar
} = require('../app/controllers/autenticacaoController');

router.route('/autenticar').post(autenticar);

module.exports = router;