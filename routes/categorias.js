const {Router} = require('express');
const {check } = require('express-validator');

const {validarCampos, validarJWT, isAdmin, validarRole} = require('../middlewares')

const { isRoleValid, emailExist, userIDExist } = require('../helpers/validatorDB');

const {
    categoryGet,
    categoryGetID,
    categoryPost,
    categoryPut,
    categoryDelete
} = require('../controllers/categorias');

const router =  Router();

router.get('/',categoryGet);

router.get('/:id',categoryGetID);

router.post('/',categoryPost);

router.put('/:id',categoryPut);

router.delete('/:id',categoryDelete); 

module.exports = router;