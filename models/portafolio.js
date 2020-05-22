'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PortafolioSchema = new Schema({
    link: String,
    email: { 
        type: String, 
        unique: true, 
        lowercase: true 
    },
    bio: String,
    recognition: [String],
    experiences: [String],
    projects: [{
        type: Schema.Types.ObjectId,
        ref: "Project"
    }]
})

const Portafolio = mongoose.model("Portafolio", PortafolioSchema)
module.exports = { 
    Portafolio, 
    PortafolioSchema
}