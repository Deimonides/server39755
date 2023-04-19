const { Router } = require('express')
const router = Router()

const ProductManager = require('../ProductManager')
const productManager = new ProductManager('./dbProducts.json')

router.get('/', (req, res) => {
    
    res.render('index', { title: 'POST de Products' , name: 'Galaxia' })

})

module.exports = router