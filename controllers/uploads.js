const { response } = require("express");
const cloudinary = require('cloudinary').v2
cloudinary.config(process.env.CLOUDINARY_URL);

const Usuario = require('../models/user');

const actualizarImagen = async (req, res = response ) => {
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
        default: return res.status(500).json({msg:'Se me olvidó validar esto'});
    }
    
    if(modelo.img){
        const nombreArr = modelo.img.split('/');
        const nombre = nombreArr[nombreArr.length - 1];
        const [public_id] = nombre.split('.'); 
        
        cloudinary.uploader.destroy(public_id);
    }
    const {tempFilePath} = req.files.archivo
    const {secure_url} = await cloudinary.uploader.upload(tempFilePath);
    modelo.img = secure_url;

    await modelo.save();

    res.json(modelo);
}

module.exports = {
    actualizarImagen
}