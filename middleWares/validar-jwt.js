const { response, request } = require('express');
const { Usuario } = require('../models/usuario');
const jwt =  require('jsonwebtoken');


const validarJWT = async(req = request, res =  response, next ) => {

    const token =  req.header('x-token');

    if(!token ) {

        return res.status(401).json({
            msg: 'No hay token en la peticion'
        })

    }

    try {

        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        
        const usuario = await Usuario.findById( uid );

        if (!usuario) {
            return res.status(401).json({
                msg: 'Token no valido - usuario borrado de la DB'
            })
        }

        if (!usuario.estado) {
            return res.status(401).json({
                msg: 'tokeb no valido - Usuario con estado false' 
            })
        }

        req.usuario = usuario;
        next();
    } catch (error) {
        return res.status(401).json({
            msg: 'Token no valido'
        })
        
    }

    next();
}


module.exports = {
    validarJWT
}