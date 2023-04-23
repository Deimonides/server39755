const { Router } = require('express')
const router = Router()


const ProductManager = require('../ProductManager')
const productManager = new ProductManager('./dbProducts.json')

router.get('/', (req, res) => {
    (async () => {
        let data = await productManager.getProducts();
        if (req.query.limit !== undefined) { // validar si existe ?limit=
            data = data.slice(0, req.query.limit)
        }
        return res.json( data )
    })()
})

router.get('/:id', (req, res) => {
    let id = parseInt( req.params.id )
    let data = productManager.getProductById(id)
    //res.send(data)
    res.json(data)
})

router.post( '/', (req, res) => {
    socketClient.on('product', newProduct)
    console.log('Datos recibidos en products.router.js: ', newProduct)
    if ( req.body !== {} ) {
        // validacion de campos obligatorios para producto nuevo...
        let missingFields = []
        !req.body.title         && missingFields.push({"error": "title required."})
        !req.body.description   && missingFields.push({"error": "description required."})
        !req.body.code          && missingFields.push({"error": "code required."})
        !req.body.price         && missingFields.push({"error": "price required."})
        !req.body.stock         && missingFields.push({"error": "stock required."})
        !req.body.category      && missingFields.push({"error": "category required."})
        if ( missingFields.length > 0 ) {
            return res.status(403).json(missingFields)
        }
        productManager.addProduct(
            req.body.title, 
            req.body.description, 
            req.body.code, 
            req.body.price, 
            status = true, 
            req.body.stock, 
            req.body.category,
            req.body.thumbnails
        )
        return res.json( productManager.getProducts() ) // mostrar el resultado

        // io.emit('actualizacion', dataActualizada);
        // res.redirect('/ruta');

    } else {
        return res.status(404).json( {"error": "Missing content."} ) // no se indicó nada
    }
})

router.put( '/:id', (req, res) => { // modificar lemento
    let id = parseInt( req.params.id )
    if ( productManager.getProductById(id) === null ) { return res.status(404).json( {"error": "Product not found."} ) } // no se encontró el producto
    let keys = Object.keys(req.body)
    let newValues = Object.values(req.body)
    if ( keys.length > 0 ) { // validar si hay campos para modificar
        for (let i = 0; i < (keys.length); i++) { // iterar por cada valor indicado
            productManager.updateProductById(id, keys[i], newValues[i])
        }
        return res.json( productManager.getProductById(id) ) // mostrar el resultado
    } else {
        return res.status(404).json( {"error": "Missing content."} ) // no se indicó nada para modificar
    }
})

router.delete( '/:id', (req, res) => {
    let id = parseInt( req.params.id )
    let deletedItem = productManager.getProductById(id)
    if ( deletedItem !== null) {
        productManager.deleteProductByID(id)
        return res.status(200).send( deletedItem )
    } else {
        return res.status(404).json( {"error": "Product not found."} ) // no se encontró el producto
    }
})

module.exports = router