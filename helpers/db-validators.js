const Rol = require('../models/rol');

const esRolValido = async (rol = '') => {
    const existeRol = await Rol.findOne({ rol });
    if (!existeRol) {
        throw new Error(`El rol ${rol} no está registrado el la DB`)
    }
}

const elementExist = async (elementFind, name, User) => {

    const element = await User.findOne({ elementFind });

    if ( element ) {
        throw new Error(`El ${name} ya existe`);
    }

}

const userExistById = async (id, User) => {

    const userExist = await User.findById(id);

    if ( !userExist ) {
        throw new Error(`El id no existe ${id}`);
    }

}

module.exports = {
    esRolValido,
    elementExist,
    userExistById
}