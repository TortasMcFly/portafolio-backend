'use strict'

const Portafolio = require('../models/portafolio').Portafolio
const User = require('../models/user')

function getPortafolio(req, res)
{
    let user_id = req.user

    User.findById(user_id, (err, user) => {

        if ( err ) return res.status(500).send({ message: err })
        if ( !user ) return res.status(404).send({ message: 'No se encontró el portafolio' })

        res.status(200).send(user)

    })
}

function savePortafolio(req, res)
{
    let user_id = req.user
    let body = req.body

    User.findById(user_id, (err, user) => {

        if ( err ) return res.status(500).send({ message: err })
        if ( !user ) return res.status(404).send({ message: 'No existe el usuario' })

        let portafolio = new Portafolio({
            link: `${user.name}?portaf_user=${user._id}`,
            email: body.email,
            bio: body.bio,
            recognition: body.recognition,
            experiences: body.experiences,
            user_id: user._id
        })

        user.portafolio = portafolio

        user.save( (err) => {
            if(err) res.status(500).send({message: `Error al guardar el portafolio: ${err}`})
            res.status(200).send({ message: "Portafolio creado correctamente" })
        })

    })
}

function updatePortafolio(req, res)
{
    let user_id = req.user
    let body = req.body

    User.findById(user_id, (err, user) => {

        if ( err ) return res.status(500).send({ message: err })
        if ( !user ) return res.status(404).send({ message: 'No se encontró el portafolio' })

        user.portafolio.email = body.email
        user.portafolio.bio = body.bio
        user.portafolio.recognition = body.recognition
        user.portafolio.experiences = body.experiences

        user.save( (err) => {
            if(err) res.status(500).send({message: `Error al actualizar el portafolio: ${err}`})
            res.status(200).send({ message: "Portafolio actualizado correctamente" })
        })

    })
}

function deletePortafolio(req, res)
{
    let user_id = req.user

    User.findById(user_id, (err, user) => {

        if ( err ) return res.status(500).send({ message: err })
        if ( !user ) return res.status(404).send({ message: 'No se encontró el portafolio' })

        user.portafolio = {}

        user.save( (err) => {
            if(err) res.status(500).send({message: `Error al eliminar el portafolio: ${err}`})
            res.status(200).send({ message: "Portafolio eliminado correctamente" })
        })

    })

}

function getPublicPortafolio(req, res)
{
    let user_id = req.query.portaf_user

    User.findById(user_id, (err, user) => {

        if ( err ) return res.status(500).send({ message: err })
        if ( !user ) return res.status(404).send({ message: 'No se encontró el portafolio' })

        res.status(200).send({ 
            user_info:{
                username: user.name + " " + user.lastname,
                tel: user.tel 
            },
            portafolio: user.portafolio, 
            social: user.social_urls
        })

    })
}

module.exports = {
    getPortafolio, 
    savePortafolio, 
    updatePortafolio,
    deletePortafolio,
    getPublicPortafolio
}