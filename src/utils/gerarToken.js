const autenticacaoConfig = require('../../config/autenticar.json');
const jwt = require('jsonwebtoken');

async function gerarToken(params = {}) {
    const token = await jwt.sign(params, autenticacaoConfig.secret, { expiresIn: 1500 });
    console.log(token);
    return token;
}

module.exports = {
    gerarToken
}