// const { Router } = require('express')
import { Router } from 'express'
const router = Router()
export default router

// const ProductManager = require('../ProductManager')
import ProductManager from '../dao/ProductManager.js'
const productManager = new ProductManager('./dbProducts.json');
// const CartManager = require('../CartManager')
import CartManager from '../dao/CartManager.js'
const cartManager = new CartManager('./dbCart.json');

// crear nuevos carritos
router.post( '/', (req, res) => {
    let user = req.query.user
    if ( user === undefined ) {
         return res.status(404).json( { "error": "Invalid username - must use: http://localhost:8080/api/cart?user=YOURNAME" } )
    } else {
        cartManager.newCart( user )
        return res.status(201).json( { "Success": "New cart created." } )
        
    }
})

router.get('/', auth, (req, res) => {
    (async () => {
        let data = await cartManager.getCarts();
        if (req.query.limit !== undefined) { // validar si existe ?limit=
            data = data.slice(0, req.query.limit)
        }
        res.json(data);
    })()
})

router.get('/:cid', auth, (req, res) => {
    let cid = +req.params.cid 
    let data = cartManager.getCartById(cid)
    if ( !data ) {
        return res.status(404).json({ "error": "Cart not found" })
    } else {
        return res.status(200).json(data)
    }
})

router.post( '/:cid/product/:id', auth, (req, res) => {

    let cid = +req.params.cid
    let id = +req.params.id
    let quantity = 1
    // validar si el Carrito existe segun su ID
    if ( !cartManager.getCartById(cid) ) { 
        return res.status(404).json({ "error": "Cart not found" })
    } 
    // validar si el Producto existe en la base de Productos
    if ( !productManager.getProductById(id) ) { 
        return res.status(404).json({ "error": "Product not found" })
    } 
    let carts = cartManager.getCarts()
    // buscar index del cartID
    let cartIndex = carts.findIndex( item => item.id === cid )
    // buscar index del producto dentro del Carrito particular
    let prodIndex = carts[cartIndex].products.findIndex( item => item.id === id)    
    if ( prodIndex > -1 ) { // si ya está el producto en el carrito, sumar quantity
        carts[cartIndex].products[prodIndex].quantity += 1
        cartManager.saveCarts(carts) // guardar todo modificado
        return res.status(201).json( { "success": "Product already added, quantity +1." })
    } else { // agregar el producto nuevo
        let newProduct = { "id": id, "quantity": quantity }
        carts[cartIndex].products.push( newProduct )
        cartManager.saveCarts(carts)
        return res.status(200).json( { "success": "Product added to the cart." })
    }
})

router.post( '/:cid', auth, (req, res) => {
    let cid = +req.params.cid
    if ( !cartManager.getCartById( cid ) ) {
        return res.status(404).json( {"error": "Cart not found."} )
    } else  {
        let payed = (req.query.payed.toLowerCase() === 'false' ? false : true)
        let carts = cartManager.getCarts()
        if ( Object.keys(carts[cartManager.getIndexOfCid(cid)].products).length === 0 ) {
            return res.status(405).json( {"error": "Cannot pay cart without products." } ) // si no hay productos no se puede pagar
        }
        carts[ cartManager.getIndexOfCid(cid) ].payed = payed // modificar el payed
        cartManager.saveCarts(carts) // guardar todo modificado
        return res.status(201).json( { "Success": "Payment status modified." } )
    }
})

router.delete( '/:cid', auth, (req, res) => { // eliminar carrito segun id
    let cid = +req.params.cid
    let deletedCart = cartManager.getCartById(cid)
    if ( deletedCart !== null) {
        cartManager.deleteCartByID(cid)
        return res.status(200).send( deletedCart )
    } else {
        return res.status(404).json( {"error": "Cart not found."} )
    }
})

// module.exports = router