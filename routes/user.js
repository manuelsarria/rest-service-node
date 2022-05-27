const { Router } = require("express");
const { check } = require("express-validator");
const { esRoleValido, emailExiste, existeUsuarioPorId} = require("../helpers/db-validators");
const { validarCampos } = require("../middleWares/validar-campos");
const {
  usersGet,
  usersPost,
  usersPut,
  usersDelete,
  usersPatch
} = require("../controllers/user");

const router = Router();

router.get("/", usersGet);

router.put("/:id",[
  check('id', 'No es un ID valido').isMongoId(),
  check('id').custom(existeUsuarioPorId),
  check('rol').custom( esRoleValido),
  validarCampos
], usersPut); // pass the reference

router.post("/",[
  check('nombre', ' el nombre es obligatorio').not().isEmpty(),
  check('password', ' el password es obligatorio y mas de 6 letras').isLength({min : 6}),
  check('correo').custom( emailExiste ),
  check('rol').custom( esRoleValido ),
  validarCampos
  
], usersPost);

router.delete("/:id",[
  check('id', 'No es un ID valido').isMongoId(),
  check('id').custom(existeUsuarioPorId),
  validarCampos
], usersDelete);

router.patch("/", usersPatch);

module.exports = router;
