const Sequelize = require('sequelize');

class Evento extends Sequelize.Model {
    static init(sequelize) {
        super.init({
            nome: Sequelize.STRING,
            email: Sequelize.STRING,
            id_grupo: Sequelize.INTEGER,
            descricao: Sequelize.STRING,
        }, { sequelize });
        return this;
    }

    static associate(models) {
        this.hasOne(models.Grupo, {
            as: 'id_grupo',
            foreignKey: 'id',
        });
    }
}

module.exports = Evento;