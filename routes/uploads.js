const {Router} = require('express');
const { check } = require('express-validator');

const {validarCampos} = require('../middlewares')
const {cloudImgPut,imgsPut} = require('../controllers/uploads');


const router =  Router();

router.put('/:coleccion/:id', [ 
    check('id','No es un ID valido').isMongoId(), 
    validarCampos],cloudImgPut);

router.put ('/usuario/:id/img',[
    check('id','No es un ID valido').isMongoId(), validarCampos
],imgsPut);

module.exports = router;