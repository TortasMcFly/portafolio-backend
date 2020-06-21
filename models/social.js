'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SocialSchema = new Schema({
    name: { 
        type: String, 
        enum:['Facebook', 'Instagram', 'Twitter', 'LinkedIn']
    },
    url: { 
        type: String
    }
}, { timestamps: true })

const Social = mongoose.model('Social', SocialSchema)
module.exports = { 
    Social,
    SocialSchema
}