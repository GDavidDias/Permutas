const http = require('http');
const express = require('express');
const cors = require('cors');

//const especialidadRoutes = require('./src/routes/especialidad.routes.js');
const usuariosRoutes = require('./src/routes/usuarios.routes.js');


const app = express();




//Configuracion de Middlewares
app.use(express.urlencoded({extended:true}));
app.use(express.json());

//HABILITO CORS
app.use(cors());

//creo servidor http para socket
const server = http.createServer(app);

//rutas
app.use('/api', usuariosRoutes);


//module.exports = app;
module.exports = server;