
const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } =  require('../middlewares/validar-jwt');
const { crearCategirias, obtenerCategorias, obtenerCategoriaID, actualizarCategoria, borrarCategoria } = require('../controllers/categories.controller');
const { categorieExistById } = require('../helpers/db-validators');
const { Categorie } = require('../models');
const { esAdminRol } = require('../middlewares');

const router = Router();

/*
    {{url}}/api/categorias
*/

// Obtener todas las  categorias - publico
router.get('/', validarCampos, obtenerCategorias);

// Obtener todas las  categorias por id - publico
router.get('/:id', [
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom((id) => categorieExistById(id, Categorie)),
    validarCampos
], obtenerCategoriaID);

// Crear una categoria - publico auth
router.post('/', [ 
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validarCampos
]
, crearCategirias );

// Atualizar una categoria por id - publico auth
router.put('/:id',[
    validarJWT,
    check('id').custom((id) => categorieExistById(id, Categorie)),
    check('id', 'No es un id valido').isMongoId(),
    validarCampos,
], actualizarCategoria);

// Eliminar una categoria por id - privado
router.delete('/:id', [
    esAdminRol,
    check('id').custom((id) => categorieExistById(id, Categorie)),
    check('id', 'No es un id valido').isMongoId(),
    validarCampos
], borrarCategoria);

module.exports = router;