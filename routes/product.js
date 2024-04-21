
const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } =  require('../middlewares/validar-jwt');
const { esAdminRol } = require('../middlewares');

const { crearProductos, obtenerProductos, obtenerProductosId, actualizarProducto, eliminarProducto } = require('../controllers/product.controller');
const { elementExist } = require('../helpers/db-validators');
const product = require('../models/product');
const { Categorie } = require('../models');

const router = Router();



// obtener producto 
router.get('/', obtenerProductos)

// obtener producto id
router.get('/:id', [
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom((id) => elementExist(id, 'productos' ,product)),
    validarCampos
],obtenerProductosId)

// Crear productos
router.post('/', [
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('descripcion','La descripcion es obligatorio').not().isEmpty(),
    check('categoria','No es un id valido').isMongoId(),
    check('id').custom((id) => categorieExistById(id, Categorie)),
    validarCampos,
], crearProductos);

router.put('/:id', [
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('descripcion','La descripcion es obligatorio').not().isEmpty(),
    check('categoria','No es un id valido').isMongoId(),
    check('id').custom((id) => categorieExistById(id, Categorie)),
    check('id','No es un id valido').isMongoId(),
    check('id').custom((id) => elementExist(id, 'productos' ,product)),
    validarCampos,
], actualizarProducto);

router.delete('/:id', [
    validarJWT,
    esAdminRol,
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom((id) => elementExist(id, 'productos' ,product)),
    validarCampos,
], eliminarProducto);



module.exports = router;