const express = require('express');

const app = express();
app.use(express.json());

app.use(async (req, res, next) => {
    await res.header("Access-Control-Allow-Origin", "*");
    await res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    return next();
});

const routes = [
    require('./routes/eventoRotas'),
    require('./routes/usuarioRotas'),
    require('./routes/autenticacao'),
];

app.use('/', routes);

app.get('/', (req, res) => {
    return res.send("Ola");
})

app.listen(3333, () => console.log('Servidor rodando'));