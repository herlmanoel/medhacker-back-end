const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());

app.use(cors());

app.use(async (req, res, next) => {
  await res.header("Access-Control-Allow-Origin", "*");
  await res.header(
    "Access-Control-Allow-Methods",
    "GET,POST,PUT,DELETE,OPTIONS,HEAD"
  );
  await res.header(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers",
    "OPTIONS,Accept,authorization, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Header"
  );
  return next();
});

const routes = [
  require("./routes/autenticacao"),
  require("./routes/usuarioRotas"),
  require("./routes/eventoRotas"),
  require("./routes/grupoRotas"),
];

app.use("/", routes);

const port = process.env.PORT || 3333;
app.listen(port, () => console.log("Servidor rodando."));
