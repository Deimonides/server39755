const ProductManager = require('./ProductManager')
const express = require('express')
const app = express()
const PORT = 8080
app.use(express.urlencoded({ extended:true }))

const productManager = new ProductManager('products.txt');

app.get('/', (req, res) => {
    res.end(`
        <h1 style="color:blue">Servidor express de Gerardo Solotun</h1>
        <h3 style="color:darkblue">Coderhouse, Comision 39755, &copy; 2023</h3>
    `)
})

app.get('/products', (req, res) => {
    (async () => {
        let data = await productManager.getProducts();
        if (req.query.limit !== undefined) { // validar si existe ?limit=
            data = data.slice(0, req.query.limit)
        }
        res.send(data);
    })()
})

app.get('/products/:id', (req, res) => {
    let id = parseInt( req.params.id )
    let data = productManager.getProductById(id)

    res.send(data)
})

const server = app.listen( PORT, () => {
    console.log(`...Servidor escuchando en el puerto ${PORT}...`)
})