'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const PortafolioScheme = require('./portafolio').PortafolioSchema
const SocialSchema = require('../models/social').SocialSchema
const bcrypt = require('bcrypt-nodejs')

const UserSchema = new Schema({

    name: { 
        type: String, 
        required: true 
    },
    lastname: {
        type: String,
        required: true
    }, 
    profile_image: String,
    tel: { 
        type: String, 
        unique: true,
        required: true
    },
    password: { 
        type: String, 
        select: false,
        required: true
    },
    last_login: Date,
    portafolio: PortafolioScheme,
    social_urls: [ SocialSchema ]

}, { timestamps: true })

UserSchema.pre('save', function(next) {
    let user = this
    if(!user.isModified('password')) return next()

    bcrypt.genSalt(10, (err, salt) => {
        if(err) return next(err)

        bcrypt.hash(user.password, salt, null, (err, hash) => {
            if(err) return next(err)

            user.password = hash
            next()
        })
    })
})




module.exports = mongoose.model('User', UserSchema)