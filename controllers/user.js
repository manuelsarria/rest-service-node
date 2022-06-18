const { response, request } = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');
 

const usersGet = async(req = request, res = response ) => {

    const { limite = 5, desde = 0} = req.query;
    const query = {estado: true};

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ])

    res.json({
        total,
        usuarios
    })
}

const usersPost = async(req, res = response ) => {

    const {nombre, correo, password,rol} = req.body;
    const usuario = new Usuario({nombre, correo, password, rol});

    //encriptar la contrasena
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync( password, salt);

    //guardar las base de datos
    await usuario.save();

    res.json({
        usuario
    })
}

const usersPut = async(req, res = response ) => {

    const {id} = req.params;
    const { _id, password, google, correo, ...others } = req.body;

    if (password) {
        const salt = bcryptjs.genSaltSync();
        others.password = bcryptjs.hashSync( password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate( id, others );
     
    res.json({
        usuario
    })
}

const usersDelete = async(req, res = response ) => {

    const { id } = req.params;
    const usuario =  await Usuario.findByIdAndUpdate(id, {estado: false});
    const usuarioAutenticado = req.usuario;

    res.json({
        usuario,
        usuarioAutenticado
    });
}

const usersPatch = (req, res = response ) => {
    
    const { id } = req.params;

    res.json({
        id
    })
}

module.exports = {
    usersGet,
    usersPost,
    usersPut,
    usersDelete,
    usersPatch
}