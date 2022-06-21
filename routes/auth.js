const { Router } = require("express");
const { check } = require("express-validator");
const { login, googleSignin } = require("../controllers/auth");
const { validarCampos } = require("../middleWares/validar-campos");

const router = Router();

router.post('/login',[
    check('correo', 'El correo es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    validarCampos
], login);

router.post('/google',[
    check('id_token', 'El token de google es necesario').not().isEmpty(),
    validarCampos
], googleSignin);

module.exports = router;