
const { Router } = require('express');
const { check } = require('express-validator');
const { cargarArchivo, actualizarImagenCloudinary, mostrarImg } = require('../controllers/uploads.controlles');
const { validarCampos, validarArchivoSubir } = require('../middlewares');
const { coleccionesPermitidas } = require('../helpers');

const router = Router();

router.post( '/' ,validarArchivoSubir ,cargarArchivo );

router.put( '/:coleccion/:id', [
    validarArchivoSubir,
    check('id', 'No es un ID válido').isMongoId(),
    check('coleccion').custom( c => coleccionesPermitidas( c ,['users', 'products', 'categories']) ),

    validarCampos
] , actualizarImagenCloudinary );

router.get( '/:coleccion/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    check('coleccion').custom( c => coleccionesPermitidas( c ,['users', 'products', 'categories']) ),
    validarCampos
], mostrarImg );

module.exports = router;