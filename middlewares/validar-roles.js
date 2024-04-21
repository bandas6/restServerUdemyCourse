const { response } = require("express")

const esAdminRol = ( req, res = response, next) => {

    if( !req.userAuth){
        return res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }

    const {rol, nombre} = req.userAuth;

    if(rol !== 'ADMIN_ROLE'){
        return res.status(403).json({
            msg: 'No tienes permisos para acceder a esta ruta - no es admin',
            ok: false
        })
    }

    next();
    
}

const tieneRol = ( ...roles ) => {

    return ( req, res = response, next) => {

        // console.log(roles, req.userAuth.rol)

        if( !req.userAuth){
            return res.status(500).json({
                msg: 'Hable con el administrador'
            })
        }

        if(!roles.includes(req.userAuth.rol)){
            return res.status(401).json({
                msg: `El servicio requiere uno de estos roles ${roles}`
            })
        }

        next();

    }

}

module.exports = {
    esAdminRol,
    tieneRol
}