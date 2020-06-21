'use strict'

const User = require('../models/user')
const jwtService = require('../services/jwt_service')

function signUp(req, res)
{
    const user = new User({
        name: req.body.name,
        lastname: req.body.lastname,
        email: req.body.email,
        tel: req.body.tel
    })

    user.password = user.generateHash(req.body.password)

    user.save( (err) => {
        if ( err ) return res.status(500).send({ message: `Ocurrió un error al registrar el usuario: ${err}` })

        res.status(200).send({ token: jwtService.createToken(user) })
    } )
}

function signIn(req, res)
{
    const body = req.body
    User.findOne( { tel: body.tel }, (err, user) => {

        if ( err ) return res.status(500).send({ message: err })
        if ( !user ) return res.status(404).send({ message: 'No se encontró un usuario asociado a ese teléfono' })

        const isValid = user.comparePassword(body.password)
        
        if( isValid ) {
            req.user = user
            res.status(200).send({
                token: jwtService.createToken(user)
            })
        }
        else {
            res.status(404).send({ message: 'Contraseña incorrecta' })
        }
    })
}

function getUserInfo(req, res)
{
    let user_id = req.user
    User.findById(user_id , (err, user) => {

        if ( err ) return res.status(500).send({ message: err })
        if ( !user ) return res.status(404).send({ message: 'No se encontró el usuario' })

        res.status(200).send( { 
            fullname: user.name + " " + user.lastname,
            tel: user.tel,
            email: user.email,
            profile_image: user.profile_image
         } )

    } )
}

function updateUser(req, res)
{
    let user_id = req.user
    let body = req.body

    User.findByIdAndUpdate(user_id, body, (err, user) =>{
        if ( err ) return res.status(500).send({ message: `Error al actualizar la información: ${err}` })

        res.status(200).send( { message: 'Información actualizada' } )
    })
}

module.exports = { 
    signUp, 
    signIn,
    getUserInfo,
    updateUser
}