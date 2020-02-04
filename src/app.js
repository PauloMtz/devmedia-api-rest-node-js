const http = require("http");
const express = require("express");
const status = require("http-status"); // npm install http-status --save
const spoilersRoute = require("./routes/spoilersRoutes");
const sequelize = require("./database/database");

const app = express();

/*const hostname = "127.0.0.1";
const port = 8080;
app.set("port", port);*/

// para garantir que sempre retorne um objeto json
app.use(express.json());

// deve ser aqui, antes de dar erro
app.use("/api", spoilersRoute); // esse '/api' será a raiz do projeto

app.use((req, res, next) => {
    //res.status(404).send("Página não encontrada.");
    res.status(status.NOT_FOUND).send();
});

// todos os erros passarão por aqui, serão transformados em objeto json
app.use((error, req, res, next) => {
    res.status(status.INTERNAL_SERVER_ERROR).json({ error });
});

const server = http.createServer(app);

/*const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    res.end("Teste... Olá, mundo!!!");
});*/

/*server.listen(port, hostname, () => {
    console.log('Servidor executando em http://${hostname}:${port}/');
});*/

// esse 'force: true' deve ser usado apenas para criar as tabelas
// ou seja, apenas na primeira vez que subir a aplicação
/*sequelize.sync({ force: true})*/
sequelize.sync()
    .then(() => {
        const port = process.env.PORT || 8080;
        app.set('port', port);
        const server = http.createServer(app);
        server.listen(port);
    });