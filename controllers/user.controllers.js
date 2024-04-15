const { response, request } = require('express');
const User = require('../models/user');
const bcryptjs = require('bcryptjs');

const usuariosGet = async (req = request, res = response) => {

    // const { q, id, nombre = 'no mname', auth, page, limit } = req.query;
    const { limit = 5, desde = 0 } = req.query;
    query = { estado: true }

    const [total, usuarios] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
            .skip(Number(desde))
            .limit(Number(limit))
    ])

    res.status(200).json({
        total, 
        usuarios,
        msg: 'get api - controller',
        ok: true
    });
}

const usuariosPost = async (req = request, res = response) => {

    const { nombre, correo, password, rol } = req.body;
    const user = new User({ nombre, correo, password, rol });

    // Ecriptar contraseña
    const salt = await bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

    //guardar en DB
    await user.save();
    delete user.password

    res.status(201).json({
        msg: 'post api - controller',
        user,
        ok: true
    });

}

const usuariosPut = async (req = request, res = response) => {

    const { id } = req.params;
    const { _id, password, google, correo, ...resto } = req.body;

    // Validar contra base de datos
    if (password) {
        const salt = await bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await User.findByIdAndUpdate(id, resto);

    res.status(200).json({
        msg: 'put api',
        usuario,
        ok: true
    });
}

const usuarioDelete = async(req, res) => {
    
    const { id } = req.params;

    // Fisicamente lo borramos
    // const usuariosEliminado = await User.findByIdAndDelete(id)

    const usuario = await User.findByIdAndUpdate(id, {estado:false});
    
    // Datos obtenidos de el middlewar validando token 
    const userAuth = req.userAuth
    
    res.status(200).json({
        msg: 'delete api',
        usuario,
        ok: true
    });

}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuarioDelete
}