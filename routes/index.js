'use strict'

const express = require('express')
const auth = require('../middlewares/auth')
const UserController = require('../controllers/user')
const PortafolioController = require('../controllers/portafolio')
const SocialController = require('../controllers/social')
const api = express.Router()

api.post('/signup', UserController.signUp)
api.post('/signin', UserController.signIn)


api.get('/v1/user', auth, UserController.getUserInfo)
api.put('/v1/user', auth, UserController.updateUser)

api.get('/v1/portafolio/', auth, PortafolioController.getPortafolio)
api.post('/v1/portafolio/', auth, PortafolioController.savePortafolio)
api.put('/v1/portafolio/', auth, PortafolioController.updatePortafolio)
api.delete('/v1/portafolio/', auth, PortafolioController.deletePortafolio)

api.get('/v1/portafolio/publico/:username', PortafolioController.getPublicPortafolio)


api.post('/v1/social', auth, SocialController.saveSocialUrl)

module.exports = api