const { response } = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');
const { generarJWT } = require('../helpers/generar-jwt');
const { googleVerify } = require('../helpers/google-verify');
const { json } = require('express/lib/response');



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

// const googleSignIn = async( req, res = response) => {

//     const { id_token } =  req.body;

//     try {

//         const {nombre, img, correo} = await googleVerify( id_token);

//         let usuario =  await Usuario.findOne({ correo });

//         if ( !usuario ) {

//             // si el usuario no existe se crea
//             const data = {
//                 nombre,
//                 correo,
//                 password: ':P',
//                 img,
//                 google: true
//             };
            
//             usuario = new Usuario( data );
//             await usuario.save();
//         }

//         if ( !usuario.estado ) {
//             return res.status(401).json({
//                 msg: 'Hable con el administrador, usuario bloqueado'
//             })
//         }

//         //generar el jwt
//         const token = await generarJWT(usuario.id);

//         res.json({
//             usuario,
//             token
//         })

//     } catch (error) {

//         res.status(400).json({
//             msg: 'El Token no se pudo verificar'
//         })
        
//     }
// }

const googleSignin = async(req, res = response) => {

    const { id_token } = req.body;
    
    try {
        const { correo, nombre, img } = await googleVerify( id_token );

        let usuario = await Usuario.findOne({ correo });

        if ( !usuario ) {
            // Tengo que crearlo
            const data = {
                nombre,
                correo,
                password: ':P',
                img,
                google: true
            };

            usuario = new Usuario( data );
            await usuario.save();
        }

        // Si el usuario en DB
        if ( !usuario.estado ) {
            return res.status(401).json({
                msg: 'Hable con el administrador, usuario bloqueado'
            });
        }

        // Generar el JWT
        const token = await generarJWT( usuario.id );
        
        res.json({
            usuario,
            token
        });
        
    } catch (error) {

        res.status(400).json({
            msg: 'Token de Google no es válido'
        })

    }

}



module.exports = {
    login,
    googleSignin
}