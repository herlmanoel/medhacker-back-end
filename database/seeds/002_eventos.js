
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('eventos').del()
    .then(function () {
      // Inserts seed entries
      return knex('eventos').insert([
        { id: 1, codigo: 'MH-00001',  nome: 'I Capacitação Medhacker: Triagem Visual', endereco: 'Av. Cap. Mor Gouveia, 3000 - Lagoa Nova, Natal - RN, 59078-970', logo: 'https://www.imd.ufrn.br/portal/assets/images/IMD_logo_01-01.svg' },
        { id: 2, codigo: 'MH-00002',  nome: 'II Capacitação Medhacker: Triagem Visual', endereco: 'Av. Cap. Mor Gouveia, 3000 - Lagoa Nova, Natal - RN, 59078-970', logo: 'https://www.imd.ufrn.br/portal/assets/images/IMD_logo_01-01.svg' },
        { id: 3, codigo: 'MH-00003',  nome: 'III Capacitação Medhacker: Triagem Visual', endereco: 'Av. Cap. Mor Gouveia, 3000 - Lagoa Nova, Natal - RN, 59078-970', logo: 'https://www.imd.ufrn.br/portal/assets/images/IMD_logo_01-01.svg' },
      ]);
    });
};
