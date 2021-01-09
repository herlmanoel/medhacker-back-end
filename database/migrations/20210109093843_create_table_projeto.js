
exports.up = function(knex) {
    return knex.schema.createTable('projetos', (table) => {
        table.increments('id').primary().unsigned();
        table.text('username').notNullable();
        table.text('senha').notNullable();
        table.text('titulo');
        table.text('descricao');
        table.text('problema');
        table.text('solucao');
        table.integer('evento_id').references('id').inTable('eventos');
        
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
      });
};

exports.down = function(knex) {
    return knex.schema.dropTable('projetos');
};
