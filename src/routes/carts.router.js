import { Router } from 'express'
import cartModel from '../models/cart.model.js'
import cidModel from '../models/cid.model.js'

const router = Router()

// VALIDACION POR ROL DE SESION
    const authAdmin = (req, res, next) => {
        if (req.session.logged_user && req.session.logged_user.role === 'admin') return next()
        return res.status(401).render('login', {mensaje: 'Permiso denegado 🚫 Por favor inicie sesión como Administrador.'})
    }
    const authUser = (req, res, next) => {
        if (req.session.logged_user && req.session.logged_user.role === 'user') return next()
        return res.status(401).render('login', {mensaje: 'Permiso denegado 🚫 Por favor inicie sesión.'})
    }


export function createCart(email) {
    // const allCarts = cartModel.getAllCarts()
    const currentUserCart = cartModel.findOne(email)
    if (!currentUserCart) {
        const newCid = cidModel.getAll()
            console.log('newCid: ', newCid);
        // const newcart = new cartModel()
    }
}

router.get('/', authAdmin, async (req, res) => {
   /*  // const carts = await cartModel.find().lean().exec() // trae todos los cartos
    let carts = []
    let newUrl = []
// PAGINADO
    let limit = parseInt(req.query.limit) || 6 //******** LIMIT
    let page = parseInt(req.query.page) || 1 //********** PAGE
// ORDENAMIENTO DE cartOS
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
// FILTRAR CATEGORIAS
    let category = req.query.category //***************** CATEGORY
    let brand = req.query.brand //*********************** BRAND
    let filter, filterQ="", filterKey, filterVal
    if (category) {
        console.log('--- Se detectó CATEGORIA');
        filter = { category }
        filterQ = `&category=${category}`
        // filterKey = 'category'
        // filterVal = category
    } else if (brand) {
        console.log('--- Se detectó MARCA');
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
 */
    const carts = await cartModel.find().lean().exec();
    /* 
    // para armar el control del paginador (un btn por cada página)
    let arrPages = []
    for(let i = 1; i < carts.totalPages+1; i++) {
        arrPages.push(i)
    }
    if (arrPages.length < 1) { arrPages.push(1) }
        // console.log('--- carts.arrPages: ', carts.arrPages);

    carts.categories = await cartModel.distinct("category").lean().exec() // trae las categorias que existen

    carts.brands = await cartModel.distinct("brand").lean().exec() // trae las marcas que existen
        // console.log('--- carts:', carts); */

    res.render('carts', { title: "Carritos", carts })
})

router.get('/add', authAdmin, (req, res) => {
    res.render('add', { })
})

// POST DE NUEVO CARRITO
router.post( '/', authAdmin, async (req, res) => {
    // const newcart = JSON.stringify( req.body )
    const newcart = req.body
    console.log( `newcart: ${newcart}` );
    const cartGenerated = new cartModel(newcart)
    await cartGenerated.save()
    console.log(`carto guardado! Codigo: ${cartGenerated.code}`);
    // res.redirect(`/carts/${cartGenerated.code}` )
    res.redirect(`/carts/abmcarts/` )
})









router.get('/abmcarts', authAdmin, async (req, res) => {
    const carts = await cartModel.find().lean().exec()
        // console.log('--- carts:', carts)
    res.render('abmcarts', { title: 'Modificar cartos', carts })
})

router.get('/abmcarts/:cid', async (req, res) => {
    const code = req.params.code
    const onecart = await cartModel.findOne( {cid} ).lean().exec()
    const carts = await cartModel.find().lean().exec()
        // console.log('--- carts:', carts)
    res.render('abmcarts', { title: 'Administrar cartos', onecart, carts })
})

// MOSTRAR UN cartO EN PARTICULAR POR SU CODIGO DE cartO
router.get('/:cid', authAdmin, async (req, res) => {
    const code = req.params.code
        // console.log('--- code: ' + code);
    const carts = await cartModel.find({code}).lean().exec()
        // console.log('--- carts: ', carts);
    res.render('cartDetail', {carts})
})


router.put( '/:code', authAdmin, async (req, res) => { // modificar elemento
    const code = req.params.code
        console.log('--- update code: ', code);
    const cartNewData = req.body
        console.log('--- body: ', JSON.stringify(cartNewData))
    try {
        await cartModel.updateOne( {code}, {...cartNewData})
    } catch (error) {
        res.send({error})
    }
    res.redirect(`/carts/abmcarts/`)
})

router.delete( '/:code', authAdmin, async (req, res) => {
    const code = req.params.code
    try {
        await cartModel.deleteOne( {code} )
        res.send("carto eliminado.")
    } catch (error) {
        res.send({error})
    }
})

export default router