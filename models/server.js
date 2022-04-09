const express = require('express');
const cors = require('cors');
const {dbconnection} = require('../db/config');
class Server{

    constructor(){
        this.app = express(); 
        this.port = process.env.PORT;
        this.path = {
            auth       : '/api/auth',
            usuarios   : '/api/usuarios',
            categorias : '/api/categorias' 
        };

        //Connection to DB
       this.connection();

        this.middlewares();

        this.routes();
    }

    routes(){
        this.app.use(this.path.auth, require('../routes/auth'));
        this.app.use(this.path.usuarios, require('../routes/usuarios'));
        this.app.use(this.path.categorias, require('../routes/categorias'));
    }

    middlewares(){
        this.app.use(cors());

        this.app.use(express.json());
        this.app.use(express.static('public'));

    }

    listen(){
        this.app.listen(this.port,()=>{
            console.log('Servidor corriendo en puerto: ',this.port);
        }) 
    }

    async connection(){
      await dbconnection();
    }
}

module.exports = Server;