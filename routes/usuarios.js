const {Router} = require('express');
const {check } = require('express-validator');

const {validarCampos, validarJWT, isAdmin, validarRole} = require('../middlewares')

const { isRoleValid, emailExist, userIDExist } = require('../helpers/validatorDB');

const { 
    usersGet, 
    usersPost, 
    usersPut, 
    usersDelete } = require('../controllers/usuarios');

const router =  Router();

router.get('/',usersGet);

router.post('/',
    [   check('name','El nombre es obligatorio').not().isEmpty(),
        check('email', 'Email invalido').isEmail(),
        check('email').custom(emailExist),
        check('password','El password debe ser mayor a 8 caracteres').isLength({min: 8}),
        check('role').custom( isRoleValid),
        validarCampos
    ],usersPost);

router.put('/:id',
    [   check('id','No es un ID valido').isMongoId(),
        check('id').custom(userIDExist),
        validarCampos
    ],usersPut);

router.delete('/:id',
    [   validarJWT,
        //adminRole,
        validarRole('ADMIN_ROLE'),
        check('id','No es un ID valido').isMongoId(),
        check('id').custom(userIDExist),
        validarCampos
    ],usersDelete); 

module.exports = router;
