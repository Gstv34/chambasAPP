const Role = require('../models/role');
const User = require('../models/user');

const isRoleValid = async(role = '') => {
    const existRole = await Role.findOne({role});
    if (!existRole){
        throw new Error(`El rol ${role} no esta registrado`);
    }
}

const emailExist = async(email = '') => {
    const existEmail = await User.findOne({email})
    if(existEmail){
        throw new Error('Este email ya está registrado');
    }
}
const userIDExist = async(id = '') => {
    const existUserID = await User.findById(id);
    if(!existUserID){
        throw new Error('Este usuario no existe');
    }
}
module.exports = {
    isRoleValid,
    emailExist,
    userIDExist
}