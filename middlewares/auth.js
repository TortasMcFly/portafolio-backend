'use strict'

const services = require('../services/jwt_service')

function isAuth(req, res, next)
{
    if(!req.headers.authorization) {
        return res.status(403).send({ message: 'No tienes autorización' })
    }

    const token = req.headers.authorization.split(" ")[1] //separar la palabra Bearer y el token
    
    services.decodeToken(token)
        .then(response => {
            req.user = response
            next()
        })
        .catch(response => {
            res.status(response.status).send({message: response.message})
        })
}

module.exports = isAuth