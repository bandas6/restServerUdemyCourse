const { request, response } = require("express");
const { Product } = require("../models");

const obtenerProductos = async (req = request, res = response) => {

    const { limit = 5, desde = 0 } = req.query;
    query = { estado: true }

    const [total, productos] = await Promise.all([
        Product.countDocuments(query),
        Product.find(query)
           .skip(Number(desde))
           .limit(Number(limit))
           .populate('usuario', 'nombre')
           .populate('categoria', 'nombre')
    ])

    res.status(200).json({
        total,
        productos,
        ok: true
    })

}

const obtenerProductosId = async (req = request, res = response) => {

    const { id } = req.params;

    const producto = await Product.findById(id).populate('usuario', 'nombre').populate('categoria','nombre');

    if (!producto) {
        return res.status(400).json({
            msg: `No existe el producto con el id ${id}`,
            ok: false
        })
    }

    res.status(200).json({
        producto,
        ok: true
    })

}


const crearProductos = async (req = request, res = response) => {

    const { nombre, precio, descripcion, categoria } = req.body;

    const productDB = await Product.findOne({ nombre });
   
    if (productDB) {
        return res.status(401).json({
            msg: `Producto ${productDB.nombre} ya existe`,
            ok: false
        })
    }

    const data = {
        nombre,
        usuario: req.userAuth._id,
        precio,
        categoria,
        descripcion,
    }

    const product = await new Product(data);
    // await product.populate('categorie').execPopulate();
    await product.save();

    res.status(201).json({
        product,
        ok: true
    });

}

const actualizarProducto = async (req = request, res = response) => {

    const { id } = req.params;
    const { nombre, precio, descripcion, categoria } = req.body;

    const producto = await Product.findByIdAndUpdate(id, { nombre, precio, descripcion, categoria }, { new: true })
    .populate('usuario','nombre')
    .populate('categoria','nombre');

    if (!producto) {
        return res.status(400).json({
            msg: `No existe el producto con el id ${id}`,
            ok: false
        })
    }

    res.status(200).json({
        producto,
        ok: true
    })

}

const eliminarProducto = async (req = request, res = response) => {
    
    const { id } = req.params;
    
    const producto = await Product.findByIdAndUpdate(id , {estado:false, disponible:false}, {new:true});

    res.status(200).json({
        producto,
        ok: true
    })

}

module.exports = {
    crearProductos,
    obtenerProductos,
    obtenerProductosId,
    actualizarProducto,
    eliminarProducto
}