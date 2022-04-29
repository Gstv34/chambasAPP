const { response } = require("express");
const cloudinary = require('cloudinary').v2
cloudinary.config(process.env.CLOUDINARY_URL);

const Usuario = require('../models/user');
const Free = require('../models/freelancer');
const Category = require('../models/category');


const cloudImgPut = async (req, res = response ) => {
    const {id, coleccion} = req.params;
    let modelo;

    switch(coleccion){
        case 'usuario':
            modelo = await Usuario.findById(id);

            if(!modelo){
                return res.status(400).json({
                    msg: 'No existe un usuario con el id proporcionado'
                });
            }
        break;
        case 'categoria': 
            modelo = await Category.findById(id);
            if(!modelo){
                return res.status(400).json({
                    msg: 'No existe una categoria con el id proporcionado'
            });
            }
        break;
        default: return res.status(500).json({msg:'Se me olvidó validar esto'});
    }
    
    if(modelo.img){
        const nombreArr = modelo.img.split('/');
        const nombre = nombreArr[nombreArr.length - 1];
        const [public_id] = nombre.split('.'); 
        if(public_id != 'srs8o6toore6gnudex6q'){
            cloudinary.uploader.destroy(public_id);
        }
    }
    const {tempFilePath} = req.files.archivo
    const {secure_url} = await cloudinary.uploader.upload(tempFilePath);
    modelo.img = secure_url;

    await modelo.save();

    res.json(modelo);
}

const imgsPut = async(req, res = response) => {
const {id} = req.params;
const freelancer = await Free.findById(id);

     if(!freelancer){
        return res.status(400).json({
                    msg: 'No existe un prestador de servicios con el id proporcionado'
         });
    }

    if(freelancer.img.length <= 4){

    const {tempFilePath} = req.files.archivo
    const {secure_url} = await cloudinary.uploader.upload(tempFilePath);
    const free = await Free.findOneAndUpdate({_id: id },{$push:{img : secure_url}}); 

    await free.save();

    }else{
        return res.status(406).json(
            {msg : 'Ha alcanzado el máximo de imagenes almacenadas'});
    }

    res.json(freelancer);
}

module.exports = {
    cloudImgPut,
    imgsPut
}