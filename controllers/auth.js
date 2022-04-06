const bcryptjs = require('bcryptjs');

const {generarJWT} = require('../helpers/generateJWT');

const {response} = require('express');

const  User = require('../models/user');

const login = async(req, res = response) =>{
const {email,password} = req.body;

    try{

        const usuario = await User.findOne({email});
        if(!usuario){
            return res.status(400).json({msg:"Email o password no son correctos"});
        }

        if(usuario.verify === false){
            return res.status(400).json({msg:"Usuario no verificado"});
        }

        const validPassword = bcryptjs.compareSync(password,usuario.password);
        if(!validPassword){
            return res.status(400).json({msg:"Email o password no son correctos"});
        }

        const token = await generarJWT(usuario.id);

        res.json({
            msg: "post: {{url}}/api/auth/login",
            usuario,
            token
        });

    }catch(error){
        console.log(error);
        return res.status(500).json({
            msg : 'Algo ha salido mal, contactese con el administrador'
        });
    }

}

module.exports = {
    login
}