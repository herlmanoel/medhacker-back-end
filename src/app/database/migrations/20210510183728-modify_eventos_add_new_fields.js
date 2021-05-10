'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      'eventos',
      'inicio_inscricao', // new field name
      {
        type: Sequelize.DATE,
      },
    )
    await queryInterface.addColumn(
      'eventos',
      'fim_inscricao', // new field name
      {
        type: Sequelize.DATE,
      },
    )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('eventos', 'inicio_inscricao')
    await queryInterface.removeColumn('eventos', 'fim_inscricao')
  }
};
