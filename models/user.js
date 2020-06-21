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
    email: { 
        type: String,
        lowercase: true 
    },
    password: { 
        type: String,
        required: true
    },
    last_login: Date,
    portafolio: PortafolioScheme,
    social_urls: [ SocialSchema ]

}, { timestamps: true })

UserSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}

UserSchema.methods.comparePassword = function(candidatePassword) {
    
    if(this.password != null) {
        return bcrypt.compareSync(candidatePassword, this.password);
    } else {
        return false;
    }
}




module.exports = mongoose.model('User', UserSchema)