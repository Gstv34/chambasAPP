const {request, response} = require('express');

const categoryGet = (req = request, res = response) => {

    res.json({
        msg : 'get'
    });
}
const categoryGetID = (req = request, res = response) => {

    res.json({
        msg : 'get :id'
    });
}
const categoryPost = (req = request, res = response) => {
    res.json({
        msg : 'post'
    });
}
const categoryPut = (req = request, res = response) => {
    res.json({
        msg : 'put'
    });
}
const categoryDelete = (req = request, res = response) => {
    res.json({
        msg : 'delete'
    });
}
module.exports = {
    categoryGet,
    categoryPost,
    categoryPut,
    categoryDelete,
    categoryGetID
}