const {Router} = require('express');
const { check } = require('express-validator');

const {freePost, freeGet} = require('../controllers/freelancer');
const {validarCampos} = require('../middlewares')

const router =  Router();
router.get('/',freeGet);
router.post('/',freePost);

module.exports = router;