const { QueryTypes } = require('sequelize');
const db = require('../app/models/Usuario');

function dateNowFormat() {
     const date = new Date();
     return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}` ;
} 

module.exports = async (evento, user) => {
    const [ idEvento ] = evento;
    const inicio = "INSERT INTO `usuarios_eventos` (`created_at`,`updated_at`,`id_evento`,`id_usuario`)"
    const sql = `${inicio} VALUES ('${dateNowFormat()}','${dateNowFormat()}',${idEvento},${user.id});`
    await db.sequelize.query(sql, { type: QueryTypes.INSERT });
}
