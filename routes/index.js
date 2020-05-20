'use strict'

const express = require('express')
const auth = require('../middlewares/auth')
const UserController = require('../controllers/user')
const PortafolioController = require('../controllers/portafolio')
const api = express.Router()

/** @login_endpoints **/
api.post('/signup', UserController.signUp)
api.post('/signin', UserController.signIn)
api.get('/v1/user', auth, UserController.getUserInfo)

api.post('/v1/portafolio/', auth, PortafolioController.savePortafolio)
api.get('/v1/portafolio/publico/:username', PortafolioController.getPublicPortafolio)

module.exports = api