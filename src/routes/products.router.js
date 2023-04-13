const { Router } = require('express')
const router = Router()

const ProductManager = require('../ProductManager')
// const productManager = new ProductManager('products.txt');
const productManager = new ProductManager('./dbProducts.json')

router.get('/', (req, res, next) => {
    (async () => {
        let data = await productManager.getProducts();
        if (req.query.limit !== undefined) { // validar si existe ?limit=
            data = data.slice(0, req.query.limit)
        }
        //res.send(data);
        res.json(data);
    })()
})

router.get('/:id', (req, res) => {
    let id = parseInt( req.params.id )
    let data = productManager.getProductById(id)
    //res.send(data)
    res.json(data)
})

router.post( '/', (req, res) => {
    // (async () => {
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

    // })()

    // res.status(201).send('Respuesta: Router POST')
    res.status(201).send(productManager.getProducts())
})

router.put( '/:id', (req, res) => { // modificar lemento

    // Object.keys( array ) => devuelve un array de solo las Keys
    // Object.values( array ) => devuelve un array de solo las Values

    let id = parseInt( req.params.id )
        console.log(id);
    let keys = Object.keys(req.body)
        console.log(keys);
    let newValues = Object.values(req.body)
        console.log(newValues);
    
    // productManager.updateProductById(id, 
            // for desde 0 hasta array.keys.lenght-1, para recorrer el array de las keys asignando los valores
        
    // )



    res.send('Respuesta: Router PUT')
})

router.delete( '/:id', (req, res) => {
    res.send('Respuesta: Router DELETE')
})

module.exports = router