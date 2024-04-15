const { response } = require("express");

const bcryptjs = require('bcryptjs');

const User = require("../models/user");
const { generarJWT } = require("../helpers/generar-jwt");




const login = async (req, res = response) => {

    const { correo, password } = req.body;

    try {

        // Verificar si el email existe
        const user = await User.findOne({ correo });
        
        if (!user) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - correo',
                ok: false
            })
        }

        // Si el usuario esta activo

        if (!user.estado) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - estado: false',
                ok: false
            })
        }

        // Verificar contrasena
        const validPassword = bcryptjs.compareSync( password , user.password );
        if (!validPassword) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - password',
                ok: false
            })
        }

        // Generar el JWT

        const token = await generarJWT(user.id);

        return res.status(200).json({
            msg: 'Todo ok',
            user,
            token,
            ok: false
        })

    } catch (error) {
        return res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }

}


module.exports = {
    login
}