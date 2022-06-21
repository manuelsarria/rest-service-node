const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');


class Server{

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            auth:       '/api/auth',
            categorias: '/api/categorias',
            usuarios:   '/api/usuarios'
        }

        //conectar db
        this.conectarDB();

        //middlewares
        this.middlewares();

        this.routes();
    }

    async conectarDB() {
        await dbConnection();
    }

    middlewares() {

        //cors
        this.app.use( cors() );

        //lectura y parseo del body
        this.app.use( express.json() );

        //directorio publico
        this.app.use(express.static('public'))
    }
    
    routes() {
        this.app.use(this.paths.auth, require('../routes/auth'));
        this.app.use(this.paths.categorias, require('../routes/categorias'));
        this.app.use(this.paths.usuarios, require('../routes/user'));

    }

    listen() {
        this.app.listen(this.port, () =>{
            console.log('servidor corriendo en el puerto', this.port);
        })
    }

}

module.exports = Server;

