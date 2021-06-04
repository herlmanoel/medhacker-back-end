const Sequelize = require('sequelize');

const Usuario = require('../models/Usuario');
const Evento = require('../models/Evento');
const Grupo = require('../models/Grupo');
const Componentes = require('../models/Componentes');

const dbconfig = require('../../config/database');

const models = [ Usuario, Evento, Grupo, Componentes ];

class Database {
    constructor() {
        this.init();
    }
    init() {
        this.connection = new Sequelize(dbconfig);
        models.map(model => model.init(this.connection))
        .map(model => model.associate && model.associate(this.connection.models));
    }
}

module.exports = new Database;