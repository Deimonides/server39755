const express = require('express')
const handlebars = require('express-handlebars')
const app = express()
const PORT = 8080
app.use(express.json())
app.use(express.urlencoded({ extended:true }))
app.use(express.static('./src/public'))

app.engine('handlebars', handlebars.engine())
app.set('views', './src/views')
app.set('view engine', 'handlebars')

const productsRouter = require('./routes/products.router.js')
app.use('/api/products', productsRouter)

const cartRouter = require('./routes/cart.router.js')
app.use('/api/cart', cartRouter)

const loaderRouter = require('./routes/loader.router.js')
app.use('/api/loader', loaderRouter)

const server = app.listen( PORT, () => {
    console.log(`[nodemon] listening on port ${PORT}`)
})

// video dia 5 tiempo 3:55:10