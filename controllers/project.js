'use strict'

const User = require('../models/user')
const Project = require('../models/project').Project


function saveProject(req, res)
{
    let user_id = req.user
    let body = req.body

    User.findById(user_id, (err, user) =>{

        if ( err ) return res.status(500).send({ message: err })
        if ( !user ) return res.status(404).send({ message: 'No existe el usuario' })

        let project = new Project({
            name: body.name,
            description: body.description, 
            cover_url: body.cover_url,
            tools: body.tools,
            images: body.images
        })

        user.portafolio.projects.push(project)

        user.save((err, userSaved) =>{
            if(err) res.status(500).send({message: `Error al guardar la información: ${err}`})
            res.status(200).send( userSaved )
        })

    })
}

function getProjects(req, res)
{
    let user_id = req.user

    User.findById(user_id, (err, user) =>{
        if ( err ) return res.status(500).send({ message: err })
        if ( !user ) return res.status(404).send({ message: 'No existe el usuario' })

        if( !user.portafolio) return res.status(404).send({ message: 'El usuario no ha creado su portafolio' })
        res.status(200).send( user.portafolio.projects )
    
    })
}

module.exports = {
    saveProject,
    getProjects
}