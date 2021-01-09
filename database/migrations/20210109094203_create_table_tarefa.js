
exports.up = function(knex) {
    return knex.schema.createTable('tarefas', (table) => {
        table.increments('id').primary().unsigned();
        table.text('titulo');
        table.text('descricao');
        table.float('nota');

        table.integer('projeto_id').references('id').inTable('projetos');
        
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
      });
};

exports.down = function(knex) {
    return knex.schema.dropTable('tarefas');
};
