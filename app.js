require('dotenv').config();
const Server = require('./models/server');


const server = new Server();
//Mensaje en linea
server.listen();

