'use strict'

const mongoose = require('mongoose')
const app = require('./app')
const config = require('./config')

mongoose.connect(config.db, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }, (err, res) => {

    if( err )
        return console.log(`Error al conectarse a la base de datos ${err}`)

    console.log("Conexión establecida con la base de datos.")

    app.listen(config.port, () => {
        console.log(`API REST corriendo en el puerto ${config.port}`)
    })

})