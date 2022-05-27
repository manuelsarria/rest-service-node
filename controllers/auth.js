const { response } = require('express');



const login = (req, res = response) => {

    const { correo, password} = req.body;

    try {
        res.json({
            msg: 'login ok'
        })
        
    } catch (error) {
        return res.status(500).json({
            msg: 'algo salio mal con el adm'
        })
    }

}


module.exports = {
    login
}