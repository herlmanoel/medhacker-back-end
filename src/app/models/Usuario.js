const Sequelize = require('sequelize');

class Usuario extends Sequelize.Model {
    static init(sequelize) {
        super.init({
            nome: Sequelize.STRING,
            senha: Sequelize.STRING,
            email: Sequelize.STRING,
            permissao: Sequelize.STRING,
        },
        { 
            sequelize
        });

        return this
    }

    static associate(models) {
        this.belongsToMany(models.Evento, {
            through: 'usuarios_eventos',
            as: 'evento',
            foreignKey: 'id_evento'
        });
    }
    
}

module.exports = Usuario;