exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('usuarios')
    .del()
    .then(() => {
      // Inserts seed entries
      return knex('usuarios').insert([
        { id: 1, nome: 'Herlmanoel Fernandes Barbosa', email: 'herlmanoel@gmail.com', senha: '00000', permissao: 'administrador'},
        { id: 2, nome: 'Heloisa  Barbosa', email: 'heloisa@gmail.com', senha: '00000', permissao: 'administrador'},
        { id: 3, nome: 'Julia Fernandes ', email: 'julia@gmail.com', senha: '00000', permissao: 'administrador'},
      ]);
    });
};
