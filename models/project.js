'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProjectSchema = new Schema({
    name: String,
    description: String, 
    cover_url: String,
    tools: [String],
    images: [String],
    is_visible: {
        type: Boolean, 
        default: true
    },
    portafolio_id: {
        type: Schema.Types.ObjectId,
        ref: "Portafolio"
    }
}, 
{ timestamps: true })

module.exports = mongoose.model("Project", ProjectSchema)