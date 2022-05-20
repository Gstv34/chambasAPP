const {Router} = require('express');
const {check } = require('express-validator');

const {validarCampos, validarJWT, isAdmin, validarRole} = require('../middlewares');
const {reviewPost, reviewGetID, reviewPut} = require('../controllers/reviews');
const {userIDExist, freeExist} = require('../helpers/validatorDB');

const router =  Router();

router.get('/:id',
    [   
        check('id','No es un ID valido').isMongoId(),
        validarCampos
    ],
reviewGetID);
router.post('/',
    [
        validarJWT,  
        check('usuario','No es un ID valido').isMongoId(),
        check('usuario','El usuario no existe').custom(userIDExist),
        check('freelancer','No es un ID valido').isMongoId(),
        check('freelancer','El prestador de servicios no existe').custom(freeExist),
        validarCampos
    ],
reviewPost);

router.put('/:id',
        validarJWT,
        reviewPut);


module.exports = router;