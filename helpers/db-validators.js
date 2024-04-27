const Rol = require('../models/rol');

const esRolValido = async (rol = '') => {
    const existeRol = await Rol.findOne({ rol });
    if (!existeRol) {
        throw new Error(`El rol ${rol} no está registrado el la DB`)
    }
}

const elementExist = async (elementFind, name, DBSchema) => {

    const element = await DBSchema.findOne({ elementFind });

    if ( element ) {
        throw new Error(`El ${element.nombre} ya existe`);
    }

}

const userExistById = async (id, User) => {

    const userExist = await User.findById(id);

    if ( !userExist ) {
        throw new Error(`El id no existe ${id}`);
    }

}

const categorieExistById = async (id, Categorie) => {

    const categorieExist = await Categorie.findById(id);

    if ( !categorieExist ) {
        throw new Error(`El id no existe ${id}`);
    }

}

const coleccionesPermitidas = ( coleccion = '', colecciones = []) => {

    const incluida = colecciones.includes(coleccion);

    if(!incluida) {
         throw new Error(`la coleccion ${coleccion} no es permitida`);
    }

    return true;

}

module.exports = {
    esRolValido,
    elementExist,
    userExistById,
    categorieExistById,
    coleccionesPermitidas
}