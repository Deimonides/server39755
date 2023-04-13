const { Router } = require('express')
const router = Router()

const ProductManager = require('../ProductManager')
const productManager = new ProductManager('products.txt');

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
    res.send('Respuesta: Router POST')
})

router.put( '/', (req, res) => {
    res.send('Respuesta: Router PUT')
})

router.delete( '/:id', (req, res) => {
    res.send('Respuesta: Router DELETE')
})

module.exports = router