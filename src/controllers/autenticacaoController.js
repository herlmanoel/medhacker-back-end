const knex = require('../../database/connection');
const bcrypt = require('bcrypt');
const usuariosTable = knex('usuarios');
const { gerarToken } = require('../utils/gerarToken');


const autenticar = async (req, res, next) => {
    const { email, senha } = req.body;

    const [ usuario ] = await usuariosTable.where('email', email);
    console.log(usuario);
    if(!usuario) {
        return res.status(400).send({ error: 'Usuário não encontrado' });
    }

    if(!await bcrypt.compare(senha, usuario.senha)){
        return res.status(400).send({ error: 'Usuário inválido' });
    }
        
    
    usuario.senha = undefined;

    // passo a info que vai diferenciar um de outro, pode ser email e id
    // hash precisa ser único, gerar o md5, expiresIn segundos
    //  sempre que autenticar o token muda
    // const token = await jwt.sign({ id: usuario.id }, autenticacaoConfig.secret, { expiresIn: 1500 });
    const token = await gerarToken({ id: usuario.id });

    res.send({
        usuario,
        token, 
    });
}

module.exports = {
    autenticar
}