const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middleWares/validar-campos");

const router = Router();


//obtener todas las categorias
router.get('/', (req, res) =>{
    res.json('get');
})

//obtener una categoria
router.get('/:id', (req, res) =>{
    res.json('get-id');
})

//crear categoria - privado - coalquier persona con un token valido
router.post('/', (req, res) =>{
    res.json('post');
})

//actualizar privado -  cualquiera con un token valido
router.put('/:id', (req, res) =>{
    res.json('put-id');
})

//actualizar privado -  cualquiera con un token valido
router.delete('/:id', (req, res) =>{
    res.json('delete-id');
})


module.exports = router;