const {request, response} = require('express');
const Review = require('../models/reviews');

const reviewGetID = async(req, res = response) =>{
    const {id} = req.params;
    const reviews = await Review.find({"freelancer": id}).sort({ createdAt: 'desc'})
    .populate('usuario', {name:1, lastname: 1, img: 1, verify: 1});

    res.json({
        route : `get: {{url}}/api/reviews/:${id}`, 
        reviews
    });

}



const reviewPost = async(req = request, res = response) => {
    const {usuario, points, title, view, freelancer} = req.body;

    const review = new Review({usuario, points, title, view, freelancer});
    await review.save();

 res.json({
     route : 'post: {{url}}/api/reviews',
     review
 });

}

module.exports = {
    reviewPost,
    reviewGetID
}