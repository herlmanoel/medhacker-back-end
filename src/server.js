const express = require('express');

const app = express();
app.use(express.json());
app.use('/', [
    require('./routes/eventoRotas'),
    require('./routes/usuarioRotas'),
]);

app.listen(3333, () => console.log('Servidor rodando'));