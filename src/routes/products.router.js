import { Router } from 'express'
import productModel from '../models/product.model.js'
import session from 'express-session'
import MongoStore from 'connect-mongo'


const router = Router()

// VALIDACION POR ROL DE SESION
    const authAdmin = (req, res, next) => {
        if (req.session.logged_user && req.session.logged_user.role === 'admin') return next()
        return res.status(401).render('login', {mensaje: 'Permiso denegado 🚫 Por favor inicie sesión.'})
    }

    const authUser = (req, res, next) => {
        if (req.session.logged_user && req.session.logged_user.role === 'user') return next()
        return res.status(401).render('login', {mensaje: 'Permiso denegado 🚫 Por favor inicie sesión.'})
    }



router.get('/', authUser, async (req, res) => {
    // const products = await productModel.find().lean().exec() // trae todos los productos
    let products = []
    // let newUrl = []
// PAGINADO
    let limit = parseInt(req.query.limit) || 6 //******** LIMIT
    let page = parseInt(req.query.page) || 1 //********** PAGE
// ORDENAMIENTO DE PRODUCTOS
    let sortQ = parseInt(req.query.sort) || 34 //***************** SORT
    let sorting
    switch (sortQ) {
        case 12:
            sorting = {'price': 1}; 
            break;
        case 21:
            sorting = {'price': -1}; 
            break;
        case 34:
            sorting = {'title': 1}; 
            break;
        case 43:
            sorting = {'title': -1}; 
            break;
    }
    // console.log('sortQ: ', sortQ);
// FILTRAR CATEGORIAS
    let category = req.query.category //***************** CATEGORY
    let brand = req.query.brand //*********************** BRAND
    let filter, filterQ="", filterKey, filterVal
    if (category) {
        // console.log('--- Se detectó CATEGORIA');
        filter = { category }
        filterQ = `&category=${category}`
        // filterKey = 'category'
        // filterVal = category
    } else if (brand) {
        // console.log('--- Se detectó MARCA');
        filter = { brand }
        filterQ = "&brand=" + brand
        // filterKey = 'brand'
        // filterVal = brand
    } else {
        filter = {}
    }
        // console.log('--- filterQ: ', filterQ);
        // console.log('--- filter: ', filter);
        // console.log('--- category: ', category);
        // console.log('--- brand: ', brand);

    products = await productModel.paginate( filter, {page, limit, sort: sorting, lean: true})
    
    // para armar el control del paginador (un btn por cada página)
    let arrPages = []
    for(let i = 1; i < products.totalPages+1; i++) {
        arrPages.push(i)
    }
    if (arrPages.length < 1) { arrPages.push(1) }
        // console.log('--- products.arrPages: ', products.arrPages);

    products.categories = await productModel.distinct("category").lean().exec() // trae las categorias que existen

    products.brands = await productModel.distinct("brand").lean().exec() // trae las marcas que existen
        // console.log('--- products:', products);

    res.render('products', { title: "Catalogo", products, arrPages, limit, page, sortQ, filterQ, filterKey, filterVal })
})

/* router.get('/add', (req, res) => {
    res.render('add', { })
}) */

router.get('/abmproducts', authAdmin, async (req, res) => {
    const products = await productModel.find().lean().exec()
        // console.log('--- products:', products)
    res.render('abmproducts', { title: 'Modificar productos', products })
})

router.get('/abmproducts/:code', authAdmin, async (req, res) => {
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
router.post( '/', authAdmin, async (req, res) => {
    // const newProduct = JSON.stringify( req.body )
    const newProduct = req.body
    console.log( `newProduct: ${newProduct}` );
    const productGenerated = new productModel(newProduct)
    await productGenerated.save()
    console.log(`Producto guardado! Codigo: ${productGenerated.code}`);
    // res.redirect(`/products/${productGenerated.code}` )
    res.redirect(`/products/abmproducts/` )
})

router.put( '/:code', authAdmin, async (req, res) => { // modificar elemento
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
})

router.delete( '/:code', authAdmin, async (req, res) => {
    const code = req.params.code
    try {
        await productModel.deleteOne( {code} )
        res.send("Producto eliminado.")
    } catch (error) {
        res.send({error})
    }
})

export default router