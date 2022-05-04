const { request, response } = require("express");
const {ObjectId} = require('mongoose').Types;
const {User, Category, Freelancer} = require('../models/models');

const colections = [
    'user'     ,
    'category' ,
    'freelance' ];
    
const search = async(req, res = response) => {
    const {colection, term} = req.params;

    if(!colections.includes(colection)){
        return res.status(400).json({
            msg: 'No existe tal coleccion'
        });
    }

    switch(colection){
        case 'user'     : searchUser(term, res); break;

        case 'category' : searchCategory(term, res); break;

        case 'freelance': searchFree(term, res); break;


        default: res.status(500).json({msg: 'Se te olvidó meter esto en busqueda'});
    }
};

const searchUser = async(term, res) =>{
    const esMongoID = ObjectId.isValid(term);

    if(esMongoID){
        const usuario = await User.findById(term);
        res.json(
            {results: (usuario) ? [usuario] : []}); 
    }
    const regex = new RegExp(term, 'i');
    const usuarios = await User.find(
        {
            $or: [{name: regex}, {lastname: regex}, {email: regex}],
            $and: [{verify: true}]
        });
    res.json(
        {results: usuarios });

}
const searchFree = async(term, res) =>{
    const esMongoID = ObjectId.isValid(term);

    if(esMongoID){
        const freelancer = await Freelancer.findById(term);
        res.json(
            {results: (freelancer) ? [freelancer] : []}); 
    }
    const regex = new RegExp(term, 'i');

    const freeJoinUser = await Freelancer.aggregate([
        {
            $lookup:{
                from: 'users',
                localField: 'usuario',
                foreignField: '_id',
                as: 'ref'
            },
        },
        {$unwind: '$ref'}, 
        {$match: {
            $or: [{'ref.name': regex},{'ref.lastname': regex} ,{skills: regex}],
        }},
        {$unset: [ 
            'ref.address',
            'ref.email', 'createdAt',
            'ref.age', 'updatedAt',
            'ref.phone',
            'ref.password',
            'ref.role',
            'ref.verify',
            'ref.google',
            'ref.createdAt',
            'ref.updatedAt']}, ]);
            
    res.json(
        {results: freeJoinUser });

}
const searchCategory = async(term, res) =>{
    const esMongoID = ObjectId.isValid(term);

    if(esMongoID){
        const category = await Category.findById(term);
        res.json(
            {results: (category) ? [category] : []}); 
    }
    const regex = new RegExp(term, 'i');
    const categories = await Category.find(
        {
            $or: [{name: regex}],
        });
    res.json(
        {results: categories });

}

module.exports = {
    search
}