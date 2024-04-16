
const { Router } = require('express');
const { check } = require('express-validator');

const { login, googleSingIn } = require('../controllers/auth.controller');
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

router.post('/google', 
[
    check('id_token', 'id_token nesesario').not().isEmpty(),
    // check('correo').custom((correo) => elementExist(correo, 'correo', user)),
    validarCampos
]
,googleSingIn );



module.exports = router;