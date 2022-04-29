const {request, response} = require('express');
const  User = require('../models/user');
const bcryptjs = require('bcryptjs');


const usersGet = async (req = request, res = response)=>{
    
    const {page, limit = 5, from = 0} = req.query; 

    const query = {verify : true};

    const [verificados, usuarios] = await Promise.all([
        User.countDocuments(query),
        User.find(query).skip(Number(from)).limit(Number(limit))
    ]);

    res.json({
        route: `get: {{url}}/api/usuarios/? limit = ${limit} && from = ${from}`, 
        verificados,
        usuarios
    });
}
const usersPost = async (req, res = response)=>{

    const {name,lastname, address, age, email, password, role, phone} = req.body;

    const usuario = new User({name, lastname, address,age, email, password, role, phone});
    
    // Password encryptation
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password,salt);

    await usuario.save();

    res.json({ route: `post: {{url}}/api/usuarios/`
    ,usuario 
    });
} 
const usersPut = async(req = request, res = response)=>{
    const {id} = req.params;
    const {_id, password,google, role, ...restUser } = req.body; 

    if(password) {
    const salt = bcryptjs.genSaltSync();
    restUser.password = bcryptjs.hashSync(password,salt);
    }

    const usuario = await User.findByIdAndUpdate(id, restUser);
    res.json({
        route: `put: {{url}}/api/usuarios/:${id}`,usuario
    });

} 
const usersDelete = async(req = request , res = response)=>{
    const {id} = req.params;

    const usuario = await User.findByIdAndUpdate(id,{verify : false});
    res.json({
        route : `delete: {{url}}/api/usuarios/:${id}`,
        usuario 
    });
}  

module.exports = {
    usersGet,
    usersPost,
    usersPut,
    usersDelete}