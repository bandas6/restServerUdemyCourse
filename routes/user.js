const { Router } = require('express');

const { usuariosGet, usuariosPost, usuariosPut } = require('../controllers/user.controllers');

const router = Router();

router.get('/', usuariosGet );  

router.post('/', usuariosPost); 

router.put('/:id', usuariosPut);   

router.delete('/', (req, res) => {
    res.status(403).json({
        msg:'delete api',
        ok:true
    });
});

router.patch('/', (req, res) => {
    res.status(403).json({
        msg:'patch  api',
        ok:true
    });
});

module.exports = router;