const { request, response } = require("express");
const Free = require('../models/freelancer');

const freeGet = async(req, res = response) =>{
    const {page, limit = 5, from = 0, strs = "3"} = req.query; 

    const query = {rank : strs};

    const [stars, usuarios] = await Promise.all([
        Free.countDocuments(query),
        Free.find(query).skip(Number(from)).limit(Number(limit))
        .populate('categories', {usuario:0})
        .populate('usuario', {  _id: 1, name: 1, lastname: 1})
    ]);

    res.json({
        route : `get: {{url}}/api/usuarios/? limit = ${limit} && from = ${from}`, 
        stars,
        usuarios
    });

}

const freePost = async (req = request, res = response) => {

const {exp, skills, social, categories, rank, usuario} = req.body;

    const freelancer = new Free({exp,skills,social,categories,rank,usuario});
    await freelancer.save();

 res.json({
     route : 'post: {{url}}/api/usuarios/free',
     freelancer
 });
}

module.exports = {
    freeGet,
    freePost
}