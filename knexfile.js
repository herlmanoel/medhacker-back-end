// Update with your config settings.

module.exports = {
  development: {
    client: 'mysql',
    connection: {
      database: 'medhacker',
      user: 'root',
      password: '',
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: `${__dirname}/database/migrations`
    },
    seeds: {
      directory: `${__dirname}/database/seeds`
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
