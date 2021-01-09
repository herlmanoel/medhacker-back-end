
exports.up = function(knex) {
    return knex.schema.createTable('eventos', (table) => {
        table.increments('id').primary().unsigned();
        table.text('codigo').notNullable();
        table.text('nome').unique().notNullable();
        table.date('inicio');
        table.date('fim');
        table.text('endereco').notNullable();
        table.text('logo').notNullable();
            
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
      });
};

exports.down = function(knex) {
    return knex.schema.dropTable('eventos');
};
