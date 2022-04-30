const {Router} = require('express');
const { check } = require('express-validator');

const {freePost, freePopularGet,freeCatGet, freeGetID} = require('../controllers/freelancer');
const {validarCampos, validarJWT} = require('../middlewares')

const router =  Router();
router.get('/',freePopularGet);
router.get('/:id',
    [
        check('id','No es un usuario valido').isMongoId(),
        validarCampos
    ],
    freeGetID);
router.post('/',
[   validarJWT,
    check('usuario','No es un usuario valido').isMongoId(),
    validarCampos
],
freePost);
router.get('/category/:id',
[   check('id','No es un usuario valido').isMongoId(),
    validarCampos
],freeCatGet);

module.exports = router;