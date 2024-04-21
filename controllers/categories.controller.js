const { request, response } = require("express");
const { Categorie } = require('../models')


const obtenerCategorias = async (req = request, res = response) => {

    const { limit = 5, desde = 0 } = req.query;
    query = { estado: true }

    const [total, categories] = await Promise.all([
        Categorie.countDocuments(query),
        Categorie.find(query)
            .populate('usuario', 'nombre')
            .skip(Number(desde))
            .limit(Number(limit))
    ])

    res.status(200).json({
        total,
        categories,
        ok: true
    })
}

const obtenerCategoriaID = async (req = request, res = response) => {

    const { id } = req.params;

    const categoria = await Categorie.findById(id).populate('usuario', 'nombre');

    if (!categoria) {
        return res.status(400).json({
            msg: `No existe la categoria con el id ${id}`,
            ok: false
        })
    }

    res.status(200).json({
        categoria,
        ok: true
    })
}

const crearCategirias = async (req = request, res = response) => {

    const nombre = req.body.nombre.toUpperCase();

    const categoriaDB = await Categorie.findOne({ nombre });

    if (categoriaDB) {
        return res.status(400).json({
            msg: `Categoria ${categoriaDB.nombre} ya existe`,
            ok: false
        })
    }

    // Generar la data a guardar

    const data = {
        nombre,
        usuario: req.userAuth._id
    }

    console.log(data);

    const categorie = new Categorie(data);

    // Guardar en DB
    await categorie.save()

    res.status(201).json({
        categorie
    })

}

const actualizarCategoria = async (req = request, res = response) => {

    const { id } = req.params;
    const { estado, usuario, ...data } = req.body;

    data.nombre = data.nombre.toUpperCase();
    data.usuario = req.userAuth._id;

    const categorie = await Categorie.findByIdAndUpdate(id, data, { new: true });

    res.status(200).json({
        categorie,
        ok: true
    })

}

const borrarCategoria = async (req = request, res = response) => {

    const { id } = req.params;

    const categoria = await Categorie.findByIdAndUpdate(id, { estado: false }, { new: false });

    res.status(200).json({
        categoria,
        ok: true
    })

}



module.exports = {
    crearCategirias,
    obtenerCategorias,
    obtenerCategoriaID,
    actualizarCategoria,
    borrarCategoria
}