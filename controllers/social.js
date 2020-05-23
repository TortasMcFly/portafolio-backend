'use strict'

const Social = require('../models/social').Social
const User = require('../models/user')

function saveSocialUrl(req, res)
{
    let user_id = req.user
    let body = req.body

    User.findById(user_id, (err, user) => {
        
        if ( err ) return res.status(500).send({ message: err })
        if ( !user ) return res.status(404).send({ message: 'No existe el usuario' })
    
        let social = new Social({
            name: body.name,
            url: body.url
        })

        user.social_urls.push(social)

        user.save( (err, userSaved) => {
            if(err) res.status(500).send({message: `Error al guardar la información: ${err}`})
            res.status(200).send(userSaved.social_urls)
        })

    })
}

function deleteAllSocialUrl(req, res)
{
   let user_id = req.user
   let body = req.body

   User.findById( user_id, (err, user) => {
   	if ( err ) return res.status(500).send({ message: err })
	if ( !user ) return res.status(404).send({ message: 'No existe el usuario' })     
   
	user.social_urls = []

	user.save( (err, userSaved) => {
           if (err) res.status(500).send( { message: `Error al guardar la información: ${err}` })
		
           res.status(200).send( { message: 'Información eliminada correctamente' } )
        })

   }) 
}

module.exports = {
    saveSocialUrl,
    deleteAllSocialUrl
}
