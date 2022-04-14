const { request, response } = require("express");
const Free = require('../models/freelancer');

const freeGet = async(req, res = response) =>{
    const {page, limit = 5, from = 0, stars = "5"} = req.query; 

    const query = {rank : stars};

    const [total, usuarios] = await Promise.all([
        Free.countDocuments(query),
        Free.find(query).skip(Number(from)).limit(Number(limit))
        .populate('categories', {usuario:0})
        .populate('usuario', {  _id: 1, name: 1, lastname: 1})
    ]);

    res.json({
        route : `get: {{url}}/api/usuarios/? limit = ${limit} && from = ${from} && stars = ${stars}`, 
        total,
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