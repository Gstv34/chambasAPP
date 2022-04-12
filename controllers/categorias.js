const {request, response} = require('express');
const Category = require('../models/category');

const categoryGet = async(req = request, res = response) => {

    const {page, limit = 5, from = 0} = req.query; 

    const query = {state : true};

    const [total, categorias] = await Promise.all([
        Category.countDocuments(query),
        Category.find(query)
        .skip(Number(from))
        .limit(Number(limit))
        .populate('usuario', {  _id: 1, name: 1, lastname: 1})
    ]);

    res.json({
        route: `get: {{url}}/api/categorias/? limit = ${limit} && from = ${from}`, 
        total,
        categorias
    });
}
const categoryGetID = async(req = request, res = response) => {
    const {id} = req.params;
    const categoria = await Category.findById(id);
    res.json({
        route: `get: {{url}}/api/categorias/:${id}`,
        categoria
    });
}
const categoryPost = async(req = request, res = response) => {
    const name = req.body.name;
    
    const categoriaDB = await Category.findOne({name}); 
    
    if(categoriaDB){
        res.status(400).json({
            msg : `La categoría ${name} ya existe`
        });
    }else{

    const data = {
        name,
        usuario: req.usuario._id
    }

    const categoria = new Category(data);

    await categoria.save();

    res.status(201).json({
        route: 'post: {{url}}/api/categorias',
        categoria
    });
}
}
const categoryPut = async(req = request, res = response) => {
    const {id} = req.params;
    const {_id, state, usuario, __v, ...restCategory } = req.body;

    const categoria = await Category.findByIdAndUpdate(id, restCategory );

    res.json({
        route : `update: {{url}}/api/categoria/:${id}`,
        categoria
    });
}
const categoryDelete = async(req = request, res = response) => {
    const {id} = req.params;

    const categoria = await Category.findByIdAndUpdate(id,{state : false},{new: true});

    res.json({
        route : `delete: {{url}}/api/categoria/:${id}`,
        categoria
    });
}
module.exports = {
    categoryGet,
    categoryPost,
    categoryPut,
    categoryDelete,
    categoryGetID
}