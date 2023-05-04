import express from 'express'
import { Server } from 'socket.io'
import handlebars  from 'express-handlebars'
import mongoose from 'mongoose'
const app = express()
const PORT = 8080
app.use(express.json())
app.use(express.urlencoded({ extended:true }))
app.use(express.static('./src/public'))

// const ProductManager = require('./ProductManager.js')
import ProductManager from './dao/ProductManager.js'
const productManager = new ProductManager('./dbProducts.json')

// Handlebars templates
    app.engine('handlebars', handlebars.engine())
    app.set('views', './src/views')
    app.set('view engine', 'handlebars')

// Endpoints
    // import productsRouter from './routes/products.router.js'
    // app.use('/api/products', productsRouter)

    // import cartRouter from './routes/cart.router.js'
    // app.use('/api/cart', cartRouter)

    import productsRouter from './routes/products.router.js'
    app.use('/products', productsRouter)

    // import realTimeProductsRouter from './routes/realTimeProducts.router.js'
    // app.use('/realtimeproducts', realTimeProductsRouter)
    
    // import newProductRouter from './routes/newProduct.router.js'
    // app.use('/newProduct', newProductRouter)

    // MongoDB connection
    mongoose.set('strictQuery', false)
    try {
        await mongoose.connect('mongodb+srv://gsolotun:Ralmin2ueTjNsHC1@cluster0.bz5igio.mongodb.net/server39755')
        app.listen( PORT, () => console.log(`[express] HTTP listening on port ${PORT}`) )
    } catch (error) {
        // handleError(error)
        console.log('[mongodb] Error de conexión a la Base de Datos!');
    }


// Servers
    /* const serverHTTP = app.listen( PORT, () => {
        console.log(`[express] HTTP listening on port ${PORT}`) // HTTP on
    })

    const socketServer = new Server( serverHTTP ) */

    /* socketServer.on('connection',   (socketClient) => {
        console.log('[nodemon] SOCKET new client') // SOCKET on

        socketClient.on('newProduct', (newProduct) =>{
            console.log(`Datos recibidos en app.js: ${(newProduct)}`)
            let arrProduct = JSON.stringify(newProduct)
            console.log(`arrProduct: ${arrProduct}`)

            // productManager.addProduct()

            // socketClient.emit('product', newProduct)
        })
    }) */