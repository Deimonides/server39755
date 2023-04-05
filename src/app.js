const ProductManager = require('./ProductManager')
//import ProductManager from 'ProductManager.js'
const express = require('express')
//import express from 'express'
const app = express()
const PORT = 8080


const productManager = new ProductManager('products.txt');

app.get('/', (req, res) => {
    res.end(`
        <h1 style="color:blue">Servidor express de Gerardo Solotun</h1>
        <h3 style="color:blue">Coderhouse, Comision 39755, &copy; 2023</h3>
    `)
})

app.get('/products', (req, res) => {
    (async () => {
        let data = await productManager.getProducts();
        res.send(data);
    })()
})

app.get('/products/:pid', (req, res) => {
    //const id = parseInt( req.params.pid )
    //const numero = +req.params.pid 
    const numero = +req.query.pid 
    //(async () => {
        let data = productManager.getProductById(numero);
        res.send(data);
    //})()
})

/* app.get('/productorandom', (req, res) => {
    ;(async () => {
        let data = await container.getRandom();
        res.send(data);
    })()
}) */

const server = app.listen( PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`)
})
//server.on('error', (error) => console.log(`! Error en el servidor: ${error}`))
