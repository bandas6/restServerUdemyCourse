const { Schema, model } = require('mongoose');

const CategorieSchema = new Schema({
    nombre:{
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true
    },
    estado:{
        type: Boolean,
        default:true,
        required: true
    },
    usuario:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'El usuario es obligatorio'],
    },
});

CategorieSchema.methods.toJSON = function () {
    const { __v, estado, ...data } = this.toObject();
    return data;
}

module.exports = model('Categorie', CategorieSchema);