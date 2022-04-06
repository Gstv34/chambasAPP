const {Router} = require('express');

const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/field-validator');

const { login } = require('../controllers/auth');

const router =  Router();

router.post('/login',
[   check('email','Email invalido').isEmail(),
    check('password','La contraseña es obligatoria').not().isEmpty(),
    validarCampos
],login);

module.exports = router;