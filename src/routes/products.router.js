import { Router } from 'express'
import productModel from '../models/product.model.js'
import querystring from 'querystring'
import url from 'url'

const router = Router()

router.get('/', async (req, res) => {
    // const products = await productModel.find().lean().exec() // trae todos los productos
    let products = []
    let newUrl = []
    // const currentUrl = req.originalUrl
    //     console.log('--- currentUrl: ', currentUrl);
    // const queryParams = req.query;
    //     console.log('--- queryParams: ', queryParams);
// PAGINADO
    let limit = parseInt(req.query.limit) || 6 //******** LIMIT
    let page = parseInt(req.query.page) || 1 //********** PAGE


    
    


// ORDENAMIENTO DE PRODUCTOS
    let sortQ = req.query.sort || 'az' //***************** SORT
    let sorting
    switch (sortQ) {
        case '09':
            sorting = {'price': 1}; 
            break;
        case '90':
            sorting = {'price': -1}; 
            break;
        case 'az':
            sorting = {'title': 1}; 
            break;
        case 'za':
            sorting = {'title': -1}; 
            break;
    }
// FILTRAR CATEGORIAS
    let category = req.query.category //***************** CATEGORY
    let brand = req.query.brand //*********************** BRAND
    let filter, filterQ
    if (category) {
        filter = { category }
        const filterQ = `&category=${category}`
        // path = `/products?limit=${limit}&sort=${sort}&category=${category}`
        // newUrl = `/products?limit=${limit}&category=${category}&sort=${sort}`
    } else if (brand) {
        filter = { brand }
        const filterQ = `&brandy=${brand}`
        // path = `/products?limit=${limit}&sort=${sort}&brand=${brand}`
        // newUrl = `/products?limit=${limit}&brand=${category}&sort=${sort}`
    } else {
        filter = {}
        // path = `/products?limit=${limit}&sort=${sort}`
    }

    products = await productModel.paginate( filter, {page, limit, sort: sorting, lean: true})
    
    // para armar el control del paginador (un btn por cada página)
    let arrPages = []
    for(let i = 1; i < products.totalPages+1; i++) {
        arrPages.push(i)
    }
    if (arrPages.length < 1) { arrPages.push(1) }
        // console.log('--- products.arrPages: ', products.arrPages);

    // products.prevLink = products.hasPrevPage ? `/products?page=${products.prevPage}` : ''
    // products.prevPageN = products.hasPrevPage ? `/products?page=${products.prevPage}` : ''
        // console.log('--- products.prevLink: ', products.prevLink);
    // products.nextLink = products.hasNextPage ? `/products?page=${products.nextPage}` : ''
        // console.log('--- products.nextLink: ', products.nextLink);




    products.categories = await productModel.distinct("category").lean().exec() // trae las categorias que existen

    products.brands = await productModel.distinct("brand").lean().exec() // trae las marcas que existen
    

            console.log('--- products:', products);
    
        console.log('--- sortQ: ', sortQ);

    res.render('products', { title: "Catalogo", products, arrPages, limit, page, sortQ, filterQ })
})


router.get('/add', (req, res) => {
    res.render('add', { })
})

router.get('/abmproducts', async (req, res) => {
    const products = await productModel.find().lean().exec()
        // console.log('--- products:', products)
    res.render('abmproducts', { title: 'Modificar productos', products })
})

router.get('/abmproducts/:code', async (req, res) => {
    const code = req.params.code
    const oneProduct = await productModel.findOne( {code} ).lean().exec()
    const products = await productModel.find().lean().exec()
        // console.log('--- products:', products)
    res.render('abmproducts', { title: 'Administrar productos', oneProduct, products })
})

// MOSTRAR UN PRODUCTO EN PARTICULAR POR SU CODIGO DE PRODUCTO
router.get('/:code', async (req, res) => {
    const code = req.params.code
        // console.log('--- code: ' + code);
    const products = await productModel.find({code}).lean().exec()
        // console.log('--- products: ', products);
    res.render('productDetail', {products})
})

// POST DE NUEVO PRODUCTO
router.post( '/', async (req, res) => {
    // const newProduct = JSON.stringify( req.body )
    const newProduct = req.body
    console.log( `newProduct: ${newProduct}` );
    const productGenerated = new productModel(newProduct)
    await productGenerated.save()
    console.log(`Producto guardado! Codigo: ${productGenerated.code}`);
    // res.redirect(`/products/${productGenerated.code}` )
    res.redirect(`/products/abmproducts/` )


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

router.put( '/:code', async (req, res) => { // modificar elemento
    const code = req.params.code
        console.log('--- update code: ', code);
    const productNewData = req.body
        console.log('--- body: ', JSON.stringify(productNewData))
    try {
        await productModel.updateOne( {code}, {...productNewData})
    } catch (error) {
        res.send({error})
    }
    res.redirect(`/products/abmproducts/`)

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

router.delete( '/:code', async (req, res) => {
    const code = req.params.code

    try {
        await productModel.deleteOne( {code} )
        res.send("Producto eliminado.")
    } catch (error) {
        res.send({error})
    }

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