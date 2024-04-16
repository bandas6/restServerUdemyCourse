const { response } = require("express");

const bcryptjs = require('bcryptjs');

const User = require("../models/user");
const { generarJWT } = require("../helpers/generar-jwt");
const { googleVerify } = require("../helpers/google-verify");




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
        const validPassword = bcryptjs.compareSync(password, user.password);
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

const googleSingIn = async (req, res = response) => {

    const { id_token } = req.body;

    try {
        const {nombre, img, correo } = await googleVerify(id_token);
        
        let user = await User.findOne({correo});
        
        if (!user) {
            
            const data = {
                nombre, 
                correo,
                img,
                google:true,
                password: 'aja'
            }
            
            user = new User(data)
            console.log(user)
            await user.save();
        }

        // user is db

        if(!user.estado){
            return res.status(401).json({
                msg: 'Hable con admin - estado: false',
                ok: false
            });
        }

        // Generate JWT

        const token = await generarJWT(user.id);

        res.json({
            msg: 'Todo bien! google sing-in',
            user,
            token,
            ok: true
        })

    } catch (error) {
        console.log(error)
        res.status(400).json({
            msg: 'No se ha podido verificar el token',
            ok: false
        })
    }

}

module.exports = {
    login,
    googleSingIn
}