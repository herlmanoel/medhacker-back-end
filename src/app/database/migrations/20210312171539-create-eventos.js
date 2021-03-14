'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('eventos', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      titulo: {
        type: Sequelize.STRING,
      },
      codigo: {
        type: Sequelize.STRING,
      },
      username: {
        type: Sequelize.STRING,
      },
      senha: {
        type: Sequelize.STRING,
      },
      inicio: {
        type: Sequelize.DATE,
      },
      fim: {
        type: Sequelize.DATE,
      },
      logo: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable('eventos');
  }
};
