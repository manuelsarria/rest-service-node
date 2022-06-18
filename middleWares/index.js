const validaCampos = require("../middleWares/validar-campos");
const validarJWT = require("../middleWares/validar-jwt");
const validaRoles = require("../middleWares/validar-roles");

module.exports = {
    ...validaCampos,
    ...validarJWT,
    ...validaRoles
}
