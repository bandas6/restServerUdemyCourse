const { response, request } = require('express')

const usuariosGet = (req = request, res = response) => {

    const {q, id, nombre = 'no mname', auth, page, limit} = req.query;

    res.status(200).json({
        msg:'get api - controller',
        q, id, nombre, auth, page, limit,
        ok:true
    });
}

const usuariosPost = (req, res = response) => {

    const {nombre, edad} = req.body;

    res.status(201).json({
        msg:'post api - controller',
        nombre,
        edad,
        ok:true
    });
}

const usuariosPut = (req = request, res = response) => {

    const id = req.params.id

    res.status(403).json({
        msg:'put api',
        id: id,
        ok:true
    });
}

module.exports = {
    usuariosGet, 
    usuariosPost,
    usuariosPut
}