// const express = require('express')
import express from 'express'
// const { Server } = require('socket.io')
import { Server } from 'socket.io'
// const handlebars = require('express-handlebars')
import handlebars  from 'express-handlebars'
const app = express()
const PORT = 8080
app.use(express.json())
app.use(express.urlencoded({ extended:true }))
app.use(express.static('./src/public'))

// const ProductManager = require('./ProductManager.js')
import ProductManager from './ProductManager.js'
const productManager = new ProductManager('./dbProducts.json')

// Handlebars templates
    app.engine('handlebars', handlebars.engine())
    app.set('views', './src/views')
    app.set('view engine', 'handlebars')

// Endpoints
    // const productsRouter = require('./routes/products.router.js')
    import productsRouter from './routes/products.router.js'
    app.use('/api/products', productsRouter)

    // const cartRouter = require('./routes/cart.router.js')
    import cartRouter from './routes/cart.router.js'
    app.use('/api/cart', cartRouter)

    // const homeRouter = require('./routes/home.router.js')
    import homeRouter from './routes/home.router.js'
    app.use('/home', homeRouter)

    // const realTimeProductsRouter = require('./routes/realTimeProducts.router.js')
    import realTimeProductsRouter from './routes/realTimeProducts.router.js'
    app.use('/realtimeproducts', realTimeProductsRouter)
    
    // const newProductRouter = require('./routes/newProduct.router.js')
    import newProductRouter from './routes/newProduct.router.js'
    app.use('/newProduct', newProductRouter)

// Servers
    const serverHTTP = app.listen( PORT, () => {
        console.log(`[nodemon] HTTP listening on port ${PORT}`) // HTTP on
    })

    const socketServer = new Server( serverHTTP )

    socketServer.on('connection',   (socketClient) => {
        console.log('[nodemon] SOCKET new client') // SOCKET on

        socketClient.on('newProduct', (newProduct) =>{
            console.log(`Datos recibidos en app.js: ${(newProduct)}`)
            let arrProduct = JSON.stringify(newProduct)
            console.log(`arrProduct: ${arrProduct}`)

            // productManager.addProduct()

            // socketClient.emit('product', newProduct)
        })
    })