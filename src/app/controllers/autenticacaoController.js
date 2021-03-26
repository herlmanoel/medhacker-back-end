const bcrypt = require('bcrypt');
const Usuario = require('../models/Usuario');
const { gerarToken } = require('../../utils/gerarToken');
const jwt = require('jsonwebtoken');
const autenticacaoConfig = require('../../config/autenticar.json');

const autenticar = async (req, res, next) => {
    const userBody = req.body;
    console.debug('userBody ', userBody);

    try {
        const usuario = await Usuario.findOne({ where: { email: userBody.email } });

        if (!usuario) {
            console.log("Usuário não encontrado");
            return res.status(400).send({ error: 'Usuário não encontrado' });
        }

        if (!await bcrypt.compare(userBody.senha, usuario.senha)) {
            console.log("Senha inválida");
            return res.status(400).send({ error: 'Senha inválida' });
        }


        usuario.senha = undefined;

        // passo a info que vai diferenciar um de outro, pode ser email e id
        // hash precisa ser único, gerar o md5, expiresIn segundos
        //  sempre que autenticar o token muda
        // const token = await jwt.sign({ id: usuario.id }, autenticacaoConfig.secret, { expiresIn: 1500 });
        const token = await gerarToken({ id: usuario.id });
        console.log('Token: ', token)
        return res.status(200).json({
            usuario,
            token,
        });
    } catch (error) {
        res.status(500).send({
            erro: 'Erro ao autorizar.'
        });
    }
};

const logoff = async (req, res, next) => {
    // const token = req.headers.authorization;
    // res.headers.authorization = "";
    res.status(200).json({ message: 'Token destruído.' });
}

module.exports = {
    autenticar,
    logoff
}