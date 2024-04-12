const User = require('../models/user');

const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { esRolValido, elementExist, userExistById } = require('../helpers/db-validators');

const { usuariosGet, usuariosPost, usuariosPut, usuarioDelete } = require('../controllers/user.controllers');

const router = Router();


router.get('/', usuariosGet);

router.post('/', [
    check('correo', 'el correo no es válido').isEmail(),
    check('nombre', 'el nombre es requerido').not().isEmpty(),
    check('password', 'el password debe tener mas de 6 caracteres').isLength({ min: 6 }),
    // check('rol', 'No es un rol valido').isIn(['ADMIN_ROLE','USER_ROLE']), 
    check('rol').custom(esRolValido),
    check('correo').custom((correo) => elementExist(correo, 'correo', User)),
    validarCampos
], usuariosPost);

router.put('/:id', [
    check('id', 'No es un id valido').isMongoId(),
    check('rol').custom(esRolValido),
    check('id').custom((id) => userExistById(id, User)),
    validarCampos
], usuariosPut);

router.delete('/:id', [
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom((id) => userExistById(id, User)),
    validarCampos
] , usuarioDelete);

router.patch('/', (req, res) => {
    res.status(403).json({
        msg: 'patch  api',
        ok: true
    });
});

module.exports = router;