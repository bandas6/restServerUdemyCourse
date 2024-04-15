const { request, response } = require('express')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const validarJWT = async (req = request, res = response, next) => {


    const token = req.header('x-token');

    console.log(token)

    if (!token) {
        return res.status(401).json({ error: 'No has iniciado sesión' });
    }

    try {

        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        // leer el usuario que corresponde al uid
        const user = await User.findById(uid);

        // Si el usuario no existe
        if (!user) {
            return res.status(401).json({
                msg: 'Token no valido - usuario borrado DB',
                ok: false
            })
        }


        // Verificar si el uid no estado en true
        if (!user.estado) {
            return res.status(401).json({
                msg: 'Token no valido - estado: false',
                ok: false
            })
        }

        // req.uid = uid;

        req.userAuth = user;
        next();

    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token invaldido'
        })
    }


}

module.exports = {
    validarJWT
}