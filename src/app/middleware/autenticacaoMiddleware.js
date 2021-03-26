const jwt = require('jsonwebtoken');
const autenticacaoConfig = require('../../config/autenticar.json');

module.exports = (req, res, next) => {
    const autenticacaoHeader = req.headers.authorization;

    if (!autenticacaoHeader) {
        return res.status(401).send({ error: 'Usuário não autorizado. Token não foi informado' })
    }

    const partes = autenticacaoHeader.split(' ');

    if (!partes.length == 2) {
        return res.status(401).send({ error: 'Token inválido' });
    }


    const [scheme, token] = partes;

    if (!/^Bearer$/i) {
        return res.status(401).send({ error: 'Token mal formatado' });
    }

    jwt.verify(token, autenticacaoConfig.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({ error: 'Token inválido jwt' });
        }
        res.userId = decoded.id;
        return next();
    });
}