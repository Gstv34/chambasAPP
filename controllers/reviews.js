const {request, response} = require('express');
const { default: mongoose } = require("mongoose");
const Review = require('../models/reviews');

const reviewGetID = async(req, res = response) =>{
    const {id} = req.params;
    const _id = mongoose.Types.ObjectId(id);
    const reviews = await Review.find({"freelancer": _id}).sort({ createdAt: 'asc'})
    .populate('usuario', {name:1, lastname: 1, img: 1,});

    res.json({
        route : `get: {{url}}/api/reviews/:${_id}`, 
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

const reviewPut = async(req = request, res = response) => {
    const {id} = req.params;
    const {meta, img, usuario, ...restReview } = req.body;

    const review = await Review.findByIdAndUpdate(id, restReview );

    res.json({
        route : `update: {{url}}/api/reviews/:${id}`,
        review
    });
}

module.exports = {
    reviewPost,
    reviewGetID,
    reviewPut
}