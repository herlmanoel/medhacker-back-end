
exports.up = function(knex) {
    return knex.schema.createTable('usuarios_eventos', (table) => {
        table.increments('id').primary().unsigned();
        table.integer('usuario_id').references('id').inTable('usuarios');
        table.integer('evento_id').references('id').inTable('eventos');
            
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
      });
};

exports.down = function(knex) {
    return knex.schema.dropTable('usuarios_eventos');
};
