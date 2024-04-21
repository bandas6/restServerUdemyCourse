const { request, response } = require("express");
const { ObjectId } = require('mongoose').Types;
const { User, Categorie, Product, Rol } = require('../models')

const coleccionesPermitidas = [
    'users',
    'products',
    'categories',
    'rols'
]

const buscarUsuarios = async (termino = '', res = response) => {

    const esMongoID = ObjectId.isValid(termino);

    if (esMongoID) {
        const user = await User.findById(termino);
        return res.json({
            results: (user) ? [user] : []
        })
    }

    const regex = new RegExp(termino, 'i');

    const users = await User.find({
        $or: [{ nombre: regex }, { correo: regex }],
        $and: [{ estado: true }]
    });

    res.json({
        results: users
    })

}

const buscarProducto = async (termino = '', res = response) => {

    const esMongoID = ObjectId.isValid(termino);

    if (esMongoID) {
        const product = await Product.findById(termino).populate('categoria','nombre').populate('usuario','nombre');
        return res.json({
            results: (product) ? [product] : []
        })
    }

    const regex = new RegExp(termino, 'i');

    const products = await Product.find({
        $or: [{ nombre: regex }],
        $and: [{ estado: true }]
    }).populate('categoria','nombre').populate('usuario','nombre');

    res.json({
        results: products
    })

}

const buscarCategoria = async (termino = '', res = response) => {

    const esMongoID = ObjectId.isValid(termino);

    if (esMongoID) {
        const categorie = await Categorie.findById(termino).populate('usuario','nombre');
        return res.json({
            results: (categorie) ? [categorie] : []
        })
    }

    const regex = new RegExp(termino, 'i');

    const categorie = await Categorie.find({
        $or: [{ nombre: regex }],
        $and: [{ estado: true }]
    }).populate('usuario','nombre');

    res.json({
        results: categorie
    })

}

const buscar = (req = request, res = response) => {

    const { coleccion, termino } = req.params;

    if (!coleccionesPermitidas.includes(coleccion)) {
        return res.status(400).json({
            msg: 'Las colecciones permitidas son: ' + coleccionesPermitidas
        })
    }

    switch (coleccion) {

        case 'users':
            buscarUsuarios(termino, res);
            break;

        case 'products':
            buscarProducto(termino, res);
            break;

        case 'categories':
            buscarCategoria(termino, res)
            break;

        default:
            res.status(500).json({
                msg: 'no se ha terminado esta opcion'
            })
            break;
    }

}


module.exports = {
    buscar
}