const { Router } = require('express')
const router = Router()

const ProductManager = require('../ProductManager')
const productManager = new ProductManager('./dbProducts.json')

router.get('/', (req, res) => {
    
    res.render('home', { 
        title: 'GET de Products' , 
        allProducts: productManager.getProducts()
        
    })

})

module.exports = router