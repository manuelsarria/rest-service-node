const { response, request } = require('express');
 

const usersGet = (req = request, res = response ) => {

    const query = req.query;

    res.json({
        msg: 'GET API - controller',
        query
    })
}

const usersPost = (req, res = response ) => {

    const {nombre, edad} = req.body;

    res.json({
        msg: 'POST API - controller',
        nombre,
        edad
    })
}

const usersPut = (req, res = response ) => {

    const {id} = req.params;
     
    res.json({
        msg: 'PUT API - controller',
        id
    })
}

const usersDelete = (req, res = response ) => {
    res.json({
        msg: 'Delete API - controller'
    })
}

module.exports = {
    usersGet,
    usersPost,
    usersPut,
    usersDelete
}