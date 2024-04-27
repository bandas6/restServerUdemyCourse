const path = require("path")
const fs = require("fs")

const { response } = require("express");
const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const { subirArchivo } = require("../helpers");

const { User, Product } = require('../models');
const { request } = require("http");

const cargarArchivo = async (req, res = response) => {

    try {

        // Imagenes
        const nombre = await subirArchivo(req.files, undefined, 'imgs');

        res.status(200).json({
            nombre: nombre
        });

    } catch (error) {
        res.status(400).json({
            msg: error
        })
    }

}

// const actualizarImagen = async (req, res = response) => {

//     const { id, coleccion } = req.params

//     let modelo;

//     switch (coleccion) {
//         case 'users':
//             modelo = await User.findById(id);
//             if (!modelo) {
//                 return res.status(400).json({ msg: `No existe un usuario con ese id ${id}` })
//             }

//             break;

//         case 'products':
//             modelo = await Product.findById(id);
//             if (!modelo) {
//                 return res.status(400).json({ msg: `No existe un producto con ese id ${id}` })
//             }

//             break;

//         default:

//             return res.status(500).json({ msg: 'Se me olvidó validar esto' })
//     }

//     // Limpiar imagenes previas
//     if (modelo.img) {
//         // hay que borrrar imagen server
//         const pathImg = path.join(__dirname, '../uploads', coleccion, modelo.img);
//         if (fs.existsSync(pathImg)) {
//             fs.unlinkSync(pathImg);
//         }

//     }

//     const nombre = await subirArchivo(req.files, undefined, coleccion);
//     modelo.img = nombre;

//     await modelo.save();

//     res.json(modelo)

// }

const actualizarImagenCloudinary = async (req, res = response) => {

    const { id, coleccion } = req.params

    let modelo;

    switch (coleccion) {
        case 'users':
            modelo = await User.findById(id);
            if (!modelo) {
                return res.status(400).json({ msg: `No existe un usuario con ese id ${id}` })
            }

            break;

        case 'products':
            modelo = await Product.findById(id);
            if (!modelo) {
                return res.status(400).json({ msg: `No existe un producto con ese id ${id}` })
            }

            break;

        default:

            return res.status(500).json({ msg: 'Se me olvidó validar esto' })
    }

    // Limpiar imagenes previas
    if (modelo.img) {
        // hay que borrar imagen server
        const nombreArr = modelo.img.split('/');
        const nombre = nombreArr[nombreArr.length - 1];
        const [public_id] = nombre.split('.');
        cloudinary.uploader.destroy(public_id);
    }

    const { tempFilePath } = req.files.archivo;
    const { secure_url } = await cloudinary.uploader.upload(tempFilePath);

    modelo.img = secure_url;

    await modelo.save();

    res.json(modelo);

}

const mostrarImg = async (req = request, res = response) => {

    const { id, coleccion } = req.params

    let modelo;

    switch (coleccion) {
        case 'users':
            modelo = await User.findById(id);
            if (!modelo) {
                return res.status(400).json({ msg: `No existe un usuario con ese id ${id}` })
            }

            break;

        case 'products':
            modelo = await Product.findById(id);
            if (!modelo) {
                return res.status(400).json({ msg: `No existe un producto con ese id ${id}` })
            }

            break;

        default:

            return res.status(500).json({ msg: 'Se me olvidó validar esto' })
    }

    // Limpiar imagenes previas
    if (modelo.img) {
        // hay que borrrar imagen server
        const pathImg = path.join(__dirname, '../uploads', coleccion, modelo.img);
        if (fs.existsSync(pathImg)) {
            return res.sendFile(pathImg);
        }

    }

    const pathImg = path.join(__dirname, '../assets/no-image.jpg');
    res.sendFile(pathImg);

}

module.exports = {
    cargarArchivo,
    actualizarImagenCloudinary,
    mostrarImg
}