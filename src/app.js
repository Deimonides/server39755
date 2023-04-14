//const ProductManager = require('./ProductManager')
const express = require('express')
const app = express()
const PORT = 8080
app.use(express.json())
app.use(express.urlencoded({ extended:true }))

app.use(express.static('public'))
//const productManager = new ProductManager('products.txt');

const productsRouter = require('./routes/products.router.js')
app.use('/api/products', productsRouter)

const cartRouter = require('./routes/cart.router.js')
app.use('/api/cart', cartRouter)

/* app.get('/', (req, res) => {
    res.end(`
        <h1 style="color:blue">Servidor express de Gerardo Solotun</h1>
        <h3 style="color:darkblue">Coderhouse, Comision 39755, &copy; 2023</h3>
    `)
}) */

const server = app.listen( PORT, () => {
    console.log(`...Servidor escuchando en el puerto ${PORT}...`)
})