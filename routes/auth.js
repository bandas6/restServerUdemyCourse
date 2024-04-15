
const { Router } = require('express');
const { check } = require('express-validator');

const { login } = require('../controllers/auth.controller');
const { validarCampos } = require('../middlewares/validar-campos');
const { elementExist } = require('../helpers/db-validators');

const user = require('../models/user');


const router = Router();


router.post('/login', 
[
    check('correo', 'el correo no es válido').isEmail(),
    check('password', 'el contraseña es obligatoria').not().isEmpty(),
    // check('correo').custom((correo) => elementExist(correo, 'correo', user)),
    validarCampos
]
,login );



module.exports = router;