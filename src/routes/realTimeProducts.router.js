const { Router } = require('express')
const router = Router()
// const socketClient = io()

const ProductManager = require('../ProductManager')
const productManager = new ProductManager('./dbProducts.json')

router.get('/', (req, res) => {
    
    res.render('realTimeProducts', { 
        title: 'WEBSOCKET de Products' , 
        name: 'realTimeProducts',
        allProducts: productManager.getProducts()
        
    })

})

module.exports = router