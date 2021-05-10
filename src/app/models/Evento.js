const Sequelize = require('sequelize');

class Evento extends Sequelize.Model {
    static init(sequelize) {
        super.init({
            titulo: Sequelize.STRING,
            codigo: Sequelize.STRING,
            endereco: Sequelize.STRING,
            descricao: Sequelize.STRING,
            logo: Sequelize.STRING,
            inicio: Sequelize.DATE,
            fim: Sequelize.DATE,
            
            inicio_inscricao: Sequelize.DATE,
            fim_inscricao: Sequelize.DATE,
        }, { sequelize });
        return this;
    }

    static associate(models) {
        this.belongsToMany(models.Usuario, {
            through: 'usuarios_eventos',
            as: 'usuario',
            foreignKey: 'id_usuario'
        });
        this.belongsToMany(models.Grupo, {
            through: 'grupos',
            as: 'grupo',
            foreignKey: 'id_grupo'
        });
    }
}

module.exports = Evento;