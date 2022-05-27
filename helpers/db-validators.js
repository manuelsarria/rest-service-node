const Role =  require('../models/role');
const usuario = require('../models/usuario');

const esRoleValido = async(rol = '') => {
    
    const existeRol = await Role.findOne({ rol });
    if(!existeRol){
      throw new Error(`El rol ${ rol } no esta registrado en la DB`);
    }
}

const emailExiste = async (correo = '') => {

    const existeEmail = await usuario.findOne({ correo })
    if( existeEmail ) {
        throw new Error(`El correo ya esta registrado`);
    }
}

const existeUsuarioPorId = async ( id = '') => {

    const existeUsuario = await usuario.findById( id );
    if( !existeUsuario ) {
        throw new Error(`El id no existe`);
    }
}


module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId
}
