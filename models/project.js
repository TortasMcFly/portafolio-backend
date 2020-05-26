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
    }
}, 
{ timestamps: true })

const Project = mongoose.model("Project", ProjectSchema)
module.exports = { 
    Project,
    ProjectSchema
}