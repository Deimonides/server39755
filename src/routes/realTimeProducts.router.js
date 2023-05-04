// const { Router } = require('express')
import { Router } from 'express'
const router = Router()
export default router

// const socketClient = io()

// const ProductManager = require('../ProductManager')
import ProductManager from '../dao/ProductManager.js'
const productManager = new ProductManager('./dbProducts.json')

router.get('/', (req, res) => {
    
    res.render('realTimeProducts', { 
        title: 'WEBSOCKET de Products' , 
        name: 'realTimeProducts',
        allProducts: productManager.getProducts()
        
    })

})

// module.exports = router