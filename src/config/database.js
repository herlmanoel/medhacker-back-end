module.exports = {
  "username": "root",
  "password": "",
  "database": "db_medhacker",
  "host": "localhost",
  "dialect": "mysql",
  "define": {
    "timestamp": true,
    "underscored": true,
    "underscoredAll": true
  }
};
// npx sequelize-cli model:generate --name Usuarios --attributes nome:string,email:string,email:string