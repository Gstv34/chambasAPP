const {Schema, model} = require('mongoose');

const CategorySchema = Schema({
    name: {
        type: String,
        required: [true,'Nombre de categoría obligatorio']
    },
    state: {
        type: Boolean,
        default: false,
    },
    usuario:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});
 module.exports = model('Category',CategorySchema);