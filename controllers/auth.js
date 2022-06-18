const { response } = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');
const { generarJWT } = require('../helpers/generar-jwt');



const login = async(req, res = response) => {

    const { correo, password} = req.body;

    try {
        //verificar si el email existe
        const usuario = await Usuario.findOne({ correo });
        if (!usuario){
            return res.status(400).json({
                msg: 'Usuario / password no son correctos'
            })
        }


        // si el user esta activo en la db
        if (!usuario.estado){
            return res.status(400).json({
                msg: 'Usuario / password no son correctos - estado: false'
            })
        }

        //verificar la contrasena
        const validPassword  = bcryptjs.compareSync(password, usuario.password);
        if (!validPassword){
            return res.status(400).json({
                msg: 'Usuario / password no son correctos- password'
            })
        }

        //generar el jwt
        const token = await generarJWT(usuario.id);


        res.json({
            usuario,
            token
        })
        
    } catch (error) {
        res.status(500).json({
            msg: 'algo salio mal con el adm'
        })
    }

}


module.exports = {
    login
}