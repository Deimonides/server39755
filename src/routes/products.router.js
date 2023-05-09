import { Router } from 'express'
import productModel from '../models/product.model.js'
const router = Router()

router.get('/', async (req, res) => {
    // const products = await productModel.find().lean().exec() // trae todos los productos
    let page = parseInt(req.query.page)
    !page && (page = 1)
        // console.log('page:', page);
    const products = await productModel.paginate({}, {page, limit: 6, lean: true}) // trae todos los productos
        // console.log('products', products);
    products.categories = await productModel.distinct("category").lean().exec() // trae las categorias que existen
        // console.log('categories: ', products.categories);
    products.brands = await productModel.distinct("brand").lean().exec() // trae las marcas que existen
    
    let arrPages = []
    for(let i = 1; i < products.totalPages+1; i++) {
        arrPages.push(i)
    }
    // console.log('arrPages: ', arrPages);
    
   
    

    products.prevLink = products.hasPrevPage ? `/products?page=${products.prevPage}` : ''
        // console.log('products.prevLink: ', products.prevLink);
    products.nextLink = products.hasNextPage ? `/products?page=${products.nextPage}` : ''
        // console.log('products.nextLink: ', products.nextLink);

    res.render('products', { title: "Catalogo", products, arrPages })
})

router.get('/add', (req, res) => {
    res.render('add', { })
})

router.get('/order', async (req, res) => {
    const order = req.params.order
    console.log('order');
    const products = await productModel.aggregate(
        [
            {$sort: {price: order    }},
        ]
    ).lean().exec()
    res.render('products', { products })
})

router.get('/:code', async (req, res) => {
    const code = req.params.code
    const products = await productModel.find( { code } ).lean().exec()
    res.render('products', { products })
})

router.post( '/', async (req, res) => {
    // const newProduct = JSON.stringify( req.body )
    const newProduct = req.body
    console.log( `newProduct: ${newProduct}` );
    const productGenerated = new productModel(newProduct)
    await productGenerated.save()
    console.log(`Producto guardado! Codigo: ${productGenerated.code}`);
    res.redirect(`/products/${productGenerated.code}` )


    // socketClient.on('product', newProduct)
   /*  console.log('Datos recibidos en products.router.js: ', newProduct)
    if ( req.body !== {} ) {
        // validacion de campos obligatorios para producto nuevo...
        let missingFields = []
        !req.body.title         && missingFields.push({"error": "title required."})
        !req.body.description   && missingFields.push({"error": "description required."})
        !req.body.code          && missingFields.push({"error": "code required."})
        !req.body.price         && missingFields.push({"error": "price required."})
        !req.body.stock         && missingFields.push({"error": "stock required."})
        !req.body.category      && missingFields.push({"error": "category required."})
        if ( missingFields.length > 0 ) {
            return res.status(403).json(missingFields)
        }
        productManager.addProduct(
            req.body.title, 
            req.body.description, 
            req.body.code, 
            req.body.price, 
            status = true, 
            req.body.stock, 
            req.body.category,
            req.body.thumbnails
        )
        return res.json( productManager.getProducts() ) // mostrar el resultado

        // io.emit('actualizacion', dataActualizada);
        // res.redirect('/ruta');

    } else {
        return res.status(404).json( {"error": "Missing content."} ) // no se indicó nada
    } */
})

router.put( '/:id', (req, res) => { // modificar lemento
    /* let id = parseInt( req.params.id )
    if ( productManager.getProductById(id) === null ) { return res.status(404).json( {"error": "Product not found."} ) } // no se encontró el producto
    let keys = Object.keys(req.body)
    let newValues = Object.values(req.body)
    if ( keys.length > 0 ) { // validar si hay campos para modificar
        for (let i = 0; i < (keys.length); i++) { // iterar por cada valor indicado
            productManager.updateProductById(id, keys[i], newValues[i])
        }
        return res.json( productManager.getProductById(id) ) // mostrar el resultado
    } else {
        return res.status(404).json( {"error": "Missing content."} ) // no se indicó nada para modificar
    } */
})

router.delete( '/:id', (req, res) => {
    /* let id = parseInt( req.params.id )
    let deletedItem = productManager.getProductById(id)
    if ( deletedItem !== null) {
        productManager.deleteProductByID(id)
        return res.status(200).send( deletedItem )
    } else {
        return res.status(404).json( {"error": "Product not found."} ) // no se encontró el producto
    } */
})

// module.exports = router
export default router