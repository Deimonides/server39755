// const { Router } = require('express')
import { Router } from 'express'
const router = Router()
export default router

// const ProductManager = require('../ProductManager')
import ProductManager from '../dao/ProductManager.js'
const productManager = new ProductManager('./dbProducts.json')

router.get('/', (req, res) => {
    
    res.render('home', { 
        title: 'GET de Products' , 
        allProducts: productManager.getProducts()
        
    })

})

// module.exports = router