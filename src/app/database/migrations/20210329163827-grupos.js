'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('grupos', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      nome: {
        type: Sequelize.STRING,
      },
      username: {
        type: Sequelize.STRING,
      },
      senha: {
        type: Sequelize.STRING,
      },
      descricao: {
        type: Sequelize.STRING,
      },
      id_evento: {
        type: Sequelize.INTEGER,
        references: { model: 'eventos', key: 'id' },
        onDelete: 'CASCADE',
      },
      created_at: {
        type: Sequelize.DATE,
      },
      updated_at: {
        type: Sequelize.DATE,
      },
    });
  },
  // npx sequelize db:migrate
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('usuarios_eventos');
  }
};

