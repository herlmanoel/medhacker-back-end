exports.up = (knex) => {
    return knex.schema.createTable('usuarios', (table) => {
      table.increments('id').primary().unsigned();
      table.text('nome').notNullable();
      table.text('email').notNullable();
      table.text('senha').notNullable();
      table.text('permissao').notNullable();
  
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
  };
  
  exports.down = (knex) => {
    return knex.schema.dropTable('usuarios');
  };