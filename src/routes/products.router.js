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


module.exports = router