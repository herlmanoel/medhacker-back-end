"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      "usuarios",
      "id_evento", // new field name
      {
        type: Sequelize.INTEGER,
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("usuarios", "id_evento");
  },
};
