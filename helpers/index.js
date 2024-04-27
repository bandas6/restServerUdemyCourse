const dbValidators = require('./db-validators');
const generarJwt = require('./generar-jwt');
const googleVerity = require('./google-verify');
const subirArchvi = require('./subir-archivo');

module.exports = {
    ...dbValidators,
    ...generarJwt,
    ...googleVerity,
    ...subirArchvi
}