const express = require('express');
const cors = require('cors')

const { dbConnection } = require('../database/config');
const fileUpload = require('express-fileupload');


class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            auth: '/api/auth',
            user: '/api/user',
            categories: '/api/categories',
            product: '/api/product',
            search: '/api/search',
            uploads: '/api/uploads',
        }

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

        // File uploads - Carga de archivos
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath : true
        }));

    }

    routes() {

       this.app.use(this.paths.auth, require('../routes/auth'));
       this.app.use(this.paths.categories, require('../routes/categories'));
       this.app.use(this.paths.product, require('../routes/product'));
       this.app.use(this.paths.search, require('../routes/search'));
       this.app.use(this.paths.user, require('../routes/user'));
       this.app.use(this.paths.uploads, require('../routes/uploads'));

    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server is running on port ${this.port}`);
        });
    }

}

module.exports = Server;