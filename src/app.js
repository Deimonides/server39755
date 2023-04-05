const ProductManager = require('./ProductManager')
//import ProductManager from 'ProductManager.js'
const express = require('express')
//import express from 'express'
const app = express()
const PORT = 8080


const productManager = new ProductManager('Productos.txt');

app.get('/', (req, res) => {
    res.end(`<h1 style="color:blue">Bienvenido al servidor express de Gerardo Solotun</h1>`)
})

/* app.get('/products', (req, res) => {
    ;(async () => {
        let data = await container.getAll();
        res.send(data);
    })()
})

app.get('/productorandom', (req, res) => {
    ;(async () => {
        let data = await container.getRandom();
        res.send(data);
    })()
}) */

const server = app.listen( PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`)
})
//server.on('error', (error) => console.log(`! Error en el servidor: ${error}`))
