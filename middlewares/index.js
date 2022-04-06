const  fieldValidate = require('../middlewares/field-validator');
const jwtValidate = require('../middlewares/jwt-validator');
const  roleValidate = require('../middlewares/role-validator');

module.exports = {
    ...fieldValidate,
    ...jwtValidate,
    ...roleValidate
}