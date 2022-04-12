const {Router} = require('express');
const {check } = require('express-validator');

const {validarCampos, validarJWT, isAdmin, validarRole} = require('../middlewares')

const { isRoleValid, categoryExist } = require('../helpers/validatorDB');

const {
    categoryGet,
    categoryGetID,
    categoryPost,
    categoryPut,
    categoryDelete
} = require('../controllers/categorias');

const router =  Router();

router.get('/',categoryGet);

router.get('/:id',
    [   check('id','No es un ID valido').isMongoId(),
        check('id','La categoría no existe').custom(categoryExist),
        validarCampos
    ],categoryGetID);

router.post('/',
    [   validarJWT,
        isAdmin,
        check('name','El nombre debe ser obligatorio').not().isEmpty(),
        validarCampos
    ],categoryPost);

router.put('/:id',
    [   validarJWT,
        check('id','No es un ID valido').isMongoId(),
        check('name','El nombre debe ser obligatorio').not().isEmpty(),
        check('id','La categoría no existe').custom(categoryExist),
        validarCampos
    ],categoryPut);

router.delete('/:id',
    [   validarJWT,
        isAdmin,
        check('id','No es un ID valido').isMongoId(),
        check('id','La categoría no existe').custom(categoryExist),
    ],categoryDelete); 

module.exports = router;