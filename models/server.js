const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const {dbconnection} = require('../db/config');
class Server{

    constructor(){
        this.app = express(); 
        this.port = process.env.PORT;
        this.path = {
            auth       : '/api/auth',
            usuarios   : '/api/usuarios',
            free       : '/api/usuarios/free',
            categorias : '/api/categorias',
            files      : '/api/file',
            search     : '/api/search', 
            rewiews    : '/api/reviews' 
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
        this.app.use(this.path.files, require('../routes/uploads'));
        this.app.use(this.path.free, require('../routes/freelancer'));
        this.app.use(this.path.search, require('../routes/search'));
        this.app.use(this.path.rewiews, require('../routes/reviews'));
    }

    middlewares(){
        this.app.use(cors());

        this.app.use(express.json());
        this.app.use(express.static('public'));

        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/'
        }));
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