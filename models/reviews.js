const {Schema, model} = require('mongoose');
const ReviewSchema = Schema({

    usuario:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    points: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true 
    },
    view: {
        type: String,
        required: true
    },
    img:{
        type: [String],
        required:false
    },
    freelancer: {
        type: Schema.Types.ObjectId,
        ref: 'Freelancer',
        required: true
    },
    meta: {
        likes:{
        type: Number,
        default: 0
        },
        Dislikes:{
        type: Number,
        default: 0   
        }
    }

},
{
    timestamps: true,
    versionKey: false
});
module.exports = model('Review',ReviewSchema);