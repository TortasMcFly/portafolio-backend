'use strict'

const Portafolio = require('../models/portafolio').Portafolio
const User = require('../models/user')
const crypto = require('crypto')

function savePortafolio(req, res)
{
    let user_id = req.user
    let body = req.body

    User.findById(user_id, (err, user) => {

        if ( err ) return res.status(500).send({ message: err })
        if ( !user ) return res.status(404).send({ message: 'No existe el usuario' })

        //const md5 = crypto.createHash('md5').update(user.tel).digest('hex')

        let portafolio = new Portafolio({
            link: `${user.name}/${user._id}`,
            email: body.email,
            bio: body.bio,
            recognition: body.recognition,
            experiences: body.experiences,
            user_id: user._id
        })

        user.portafolio = portafolio

        user.save( (err, userSaved) => {
            if(err) res.status(500).send({message: `Error al guardar el portafolio: ${err}`})
            res.status(200).send(userSaved.portafolio)
        })

    })
}

function getPublicPortafolio(req, res)
{
    let user_id = req.query.user_id

    User.findById(user_id, (err, user) => {

        if ( err ) return res.status(500).send({ message: err })
        if ( !user ) return res.status(404).send({ message: 'No se encontró el portafolio' })

        res.status(200).send({ portafolio: user.portafolio, social: user.social_urls })

    })
}

module.exports = {
    savePortafolio, 
    getPublicPortafolio
}