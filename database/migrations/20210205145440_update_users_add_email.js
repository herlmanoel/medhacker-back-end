
exports.up = function (knex) {
    return knex.schema.table('usuarios', (table) => {
        table.dropColumn('email');
        table.text('email').unique();
    });
};

exports.down = function (knex) {

};
