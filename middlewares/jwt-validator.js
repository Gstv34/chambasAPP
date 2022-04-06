const { response } = require("express");
const jwt = require("jsonwebtoken");

const  User = require('../models/user');

const validarJWT = async(req, res = response,next) => {
    const token = req.header('Authoritation');
    
    if(!token){
        return res.status(401).json({msg: 'No hay token en petición'});
    }
    try{
        const {uid} = jwt.verify(token,process.env.PRIVATEKEY);
        const usuario = await User.findById(uid);

        if(!usuario){
            return res.token(401).json({msg:'Token invalido - usuario inexistente'})
        }

        if(!usuario.verify){
            return res.status(401).json({msg:'Token invalido - usuario sin verificar'});
        }

        req.usuario = usuario;

        next();

    }catch(error){
        res.status(401).json({msg: 'Token invalido'});
    }
    
}
module.exports = {
    validarJWT
}