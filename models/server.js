const express = require('express');
const cors = require('cors')

const { dbConnection } = require('../database/config')


class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios'

        // Connected DB
        this.conectarDB();

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();
    }

    async conectarDB(){
        await dbConnection();
    }

    middlewares(){

        // CORS 
        this.app.use(cors());

        //Lectura y parseo body
        this.app.use(express.json());

        // Direcctorio publico
        this.app.use(express.static('public'));

    }

    routes() {

       this.app.use(this.usuariosPath, require('../routes/user'));

    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server is running on port ${this.port}`);
        });
    }

}

module.exports = Server;