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
        cartManager.newCart( user )
        return res.status(201).json( { "Success": "New cart created." } )
        
    }
})

router.get('/', (req, res) => {
    (async () => {
        let data = await cartManager.getCarts();
        if (req.query.limit !== undefined) { // validar si existe ?limit=
            data = data.slice(0, req.query.limit)
        }
        //res.send(data);
        res.json(data);
    })()
})

router.get('/:cid', (req, res) => {
    let cid = parseInt( req.params.cid )
    let data = cartManager.getCartById(cid)
    if ( !data ) {
        return res.status(404).json({ "error": "Cart not found" })
    } else {
        return res.status(200).json(data)
    }
})

























router.post( '/:cid/product/:id', (req, res) => {

    let cid = +req.params.cid
    let id = +req.params.id
    let quantity = 1

    if ( !cartManager.getCartById(cid) ) { // validar si el Carrito existe
        return res.status(404).json({ "error": "Cart not found" })
    } 

    if ( !productManager.getProductById(id) ) { // validar si el Producto existe
        return res.status(404).json({ "error": "Product not found" })
    } 
    let carts = cartManager.getCarts()

    // buscar index del cartID
    let cartIndex = carts.findIndex( item => item.id === cid )
    // console.log('++++++++++++++++index: ', index)

    let prodIndex = carts[cartIndex].products.findIndex( item => item.id === id)
    // console.log('prodIndex: ', prodIndex);
    
    if ( prodIndex > -1 ) { // si ya está el producto en el carrito, sumar quantity
        // console.log('ya existe el producto');
        // let oldQuantity = carts[cartIndex].products[prodIndex].quantity
        // console.log('oldQuantity: ', oldQuantity);
        // console.log('cartIndex: ', cartIndex);
        // console.log('prodIndex: ', prodIndex);

        carts[cartIndex].products[prodIndex].quantity += 1
        // console.log('cambiado?');
        cartManager.saveCarts(carts)
        return res.status(201).json( { "success": "Product already added, quantity +1." })
    } else { 
 
        // console.log('carts', carts);
        let newProduct = { "id": id, "quantity": quantity }
        // cartManager.getCartById(cid).products.find( item => item.id === id)
        carts[cartIndex].products.push( newProduct )
        // cartManager.
        cartManager.saveCarts(carts)
        return res.status(200).json( { "success": "Product added to the cart." })
    }
        
        
        
    // res.send('Respuesta: agregando nuevo producto...')
    

})






















router.put( '/', (req, res) => {


    res.send('Respuesta: CART Router PUT')
})

router.delete( '/:id', (req, res) => {
    res.send('Respuesta: CART Router DELETE')
})

module.exports = router