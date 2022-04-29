
    const { Schema, model} =require('mongoose');

    const UsuarioSchema = Schema(
        {
        name: {
            type: String,
            required:[true,'Nombre obligatorio']
        },
        lastname:{
            type: String,
            required:[true,'Apellidos obligatorios']
        },
        address: {
            type: String,
            required:[true,'Dirección obligatoria']
        },
        age:{
            type: String,
            required: [true,'Edad obligatoria']
        },
        phone: {
            type: String,
            default: null
        },
        email: {    
            type: String,
            required:[true,'Email obligatorio'],
            unique: true
        },
        password: {
            type: String,
            required: [true,'Password obligatoria']
        },
        role: {
            type: String,
            required: true,
            enum: ['ADMIN_ROLE','USER_ROLE']
        },
        verify: {
            type: Boolean,
            default: false
        },
        google: {
            type: Boolean,
            default: false
        }, 
        img: {type: String,
              default : 'https://res.cloudinary.com/chambas/image/upload/v1651270177/srs8o6toore6gnudex6q.png'
        },    
    },
    {
        timestamps: true,
        versionKey: false
    }
    );
    UsuarioSchema.methods.toJSON = function() {
        const {password, updatedAt, _id, ...user} = this.toObject();
        user.uid = _id;
        return user;
    }

    module.exports = model('User',UsuarioSchema);