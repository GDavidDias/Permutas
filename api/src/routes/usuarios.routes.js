const {Router} = require('express');

const {
    validateUsuario,
    registerUsuario,
    getAllUsuarios
} = require('../controllers/usuarios.controllers');

const router = Router();

router.post('/validateusuario', validateUsuario);
router.post('/registerusuario', registerUsuario);
router.post('/getinscriptos', getAllUsuarios);

//ruta para cambiar contraseña, datos pasan por body
//router.put('/changepass', changePass);

module.exports = router;