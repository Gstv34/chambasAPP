const Category = require('../models/category');
const Role = require('../models/role');
const User = require('../models/user');
const Free = require('../models/freelancer');

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
const categoryExist = async(id) =>{
    const existCategory = await Category.findById(id);
    if(!existCategory){
        throw new Error('Esta categoría no existe');
    } 
}
const freeExist = async(id) =>{
    const existFreelancer = await Free.findById(id);
    if(!existFreelancer){
        throw new Error('Este freelancer no existe');
    } 
}
const collectionsPermit = (coleccion = '', colecciones = []) =>{
    const incluida = colecciones.includes(coleccion);
    if(!incluida){
        throw new Error('La coleccíon no es permitida');
    }
    return true;
}

module.exports = {
    isRoleValid,
    emailExist,
    userIDExist,
    freeExist,
    categoryExist,
    collectionsPermit
}