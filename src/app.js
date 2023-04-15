const express = require('express')
const app = express()
const PORT = 8080
app.use(express.json())
app.use(express.urlencoded({ extended:true }))

app.use(express.static('public'))

const productsRouter = require('./routes/products.router.js')
app.use('/api/products', productsRouter)

const cartRouter = require('./routes/cart.router.js')
app.use('/api/cart', cartRouter)

const server = app.listen( PORT, () => {
    console.log(`[nodemon] listening on port ${PORT}`)
})