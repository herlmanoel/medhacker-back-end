const router = require('express').Router();

const {
    autenticar,
    logoff
} = require('../app/controllers/autenticacaoController');

router.route('/autenticar')
    .post(autenticar);


router.route('/sair')
    .get(logoff);

module.exports = router;