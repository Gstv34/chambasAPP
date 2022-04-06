const mongoose = require('mongoose');

const dbconnection = async() =>{
try{

    await mongoose.connect(process.env.MONGODB_CNN,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    
    console.log('Mongoose DB running');

}catch(error){

    console.log(error);
    
    throw new Error('Error al iniciar la base de datos');
}
}

module.exports = {
    dbconnection
}