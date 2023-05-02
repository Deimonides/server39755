import express from 'express'
import { Router } from 'express'
const router = Router()
export default router
// const socketClient = io()

// const ProductManager = require('../ProductManager')
import ProductManager from '../ProductManager.js'
const productManager = new ProductManager('./dbProducts.json')

router.get('/', (req, res) => {
    
    res.render('newProduct', { 
        title: 'Alta de Productos' , 
        name: 'newProduct',
        allProducts: productManager.getProducts()
        
    })

})

// module.exports = router