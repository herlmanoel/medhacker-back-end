const Sequelize = require('sequelize');

class Grupo extends Sequelize.Model {
    static init(sequelize) {
        super.init({
            nome: Sequelize.STRING,
            username: Sequelize.STRING,
            senha: Sequelize.STRING,
            descricao: Sequelize.STRING,
            id_evento: Sequelize.INTEGER,
        }, { sequelize });
        return this;
    }
}

module.exports = Grupo;