const {Router} = require('express');
const { check } = require('express-validator');

const {validarCampos} = require('../middlewares')
const {actualizarImagen} = require('../controllers/uploads');
 const {collectionsPermit} = require('../helpers/validatorDB');

const router =  Router();

router.put('/:coleccion/:id', [ 
    check('id','No es un ID valido').isMongoId(), 
    validarCampos],actualizarImagen);

module.exports = router;