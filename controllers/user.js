'use strict'

const User = require('../models/user')
const jwtService = require('../services/jwt_service')

function signUp(req, res)
{
    const user = new User({
        name: req.body.name,
        lastname: req.body.lastname,
        tel: req.body.tel,
        password: req.body.password
    })

    user.save( (err) => {
        if ( err ) return res.status(500).send({ message: `Ocurrió un error al registrar el usuario: ${err}` })

        res.status(200).send({ token: jwtService.createToken(user) })
    } )
}

function signIn(req, res)
{
    User.findOne( { tel: req.body.tel }, (err, user) => {

        if ( err ) return res.status(500).send({ message: err })
        if ( !user ) return res.status(404).send({ message: 'No se encontró un usuario asociado a ese teléfono' })

        req.user = user
        res.status(200).send({
            message: 'Logueado con éxito',
            token: jwtService.createToken(user)
        })

    } )
}

function getUserInfo(req, res)
{
    let user_id = req.user
    User.findById(user_id , (err, user) => {

        if ( err ) return res.status(500).send({ message: err })
        if ( !user ) return res.status(404).send({ message: 'No se encontró el usuario' })

        res.status(200).send(user)

    } )
}



module.exports = { 
    signUp, 
    signIn,
    getUserInfo
}