const { Router } = require('express')
const router = Router()

const ProductManager = require('../ProductManager')
const productManager = new ProductManager('./dbProducts.json');
const CartManager = require('../CartManager')
const cartManager = new CartManager('./dbCart.json');

// crear nuevos carritos
router.post( '/', (req, res) => {
    // res.send('Respuesta: CART Router POST')
    let user = req.query.user
    // console.log('user: '+ user);
    if ( user === undefined ) {
         return res.status(404).json( { "error": "Invalid username - must use: http://localhost:8080/api/cart?user=YOURNAME" } )
    } else {
        cartManager.addCart( user )
        return res.status(200).send("Carrito creado.")
    }
})

router.get('/', (req, res, next) => {
    (async () => {
        let data = await cartManager.getProducts();
        if (req.query.limit !== undefined) { // validar si existe ?limit=
            data = data.slice(0, req.query.limit)
        }
        //res.send(data);
        res.json(data);
    })()
})

router.get('/:id', (req, res) => {
    let id = parseInt( req.params.id )
    let data = cartManager.getProductById(id)
    //res.send(data)
    res.json(data)
})


router.put( '/', (req, res) => {
    res.send('Respuesta: CART Router PUT')
})

router.delete( '/:id', (req, res) => {
    res.send('Respuesta: CART Router DELETE')
})

module.exports = router