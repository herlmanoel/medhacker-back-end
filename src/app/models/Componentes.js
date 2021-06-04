const Sequelize = require("sequelize");

class Componentes extends Sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        nome: Sequelize.STRING,
        email: Sequelize.STRING,
        id_grupo: Sequelize.INTEGER,
      },
      { sequelize, tableName: 'componentes' }
    );
    return this;
  }
}

module.exports = Componentes;
