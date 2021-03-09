
exports.up = function (knex) {
  return knex.schema.table('usuarios', (table) => {
    table.dropColumn('email');
  });
};

exports.down = function (knex) {

};
