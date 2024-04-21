const { Schema, model } = require('mongoose');

const ProductSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true
    },
    estado: {
        type: Boolean,
        default: true,
        required: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'El usuario es obligatorio'],
    },
    precio: {
        type: Number,
        default: 0,
    },
    categoria: {
        type: Schema.Types.ObjectId,
        ref: 'Categorie',
        required: [true, 'La categoria es obligatoria'],
    },

    descripcion: { type: String },
    disponible: { type: Boolean, default: true },

});

ProductSchema.methods.toJSON = function () {
    const { __v, estado, ...data } = this.toObject();
    return data;
}

module.exports = model('Product', ProductSchema);