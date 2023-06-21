import { Router } from 'express'
import cartModel from '../models/cart.model.js'

const router = Router()

// VALIDACION POR ROL DE SESION
    const authAdmin = (req, res, next) => {
        if (req.session.logged_user && req.session.logged_user.role === 'admin') return next()
        return res.status(401).render('login', {mensaje: '🚫 Inicie sesión como Administrador.'})
    }
    const authUser = (req, res, next) => {
        if (req.session.logged_user && req.session.logged_user.role === 'user') return next()
        return res.status(401).render('login', {mensaje: '🚫 Inicie sesión.'})
    }

//ok
router.get('/', authAdmin, async (req, res) => {
    const carts = await cartModel.find().lean().exec();
    res.status(200).render('carts', { title: "Carritos", carts })
})
//ok
router.get('/:id', authAdmin, async (req, res) => {
    const id = req.params.id
    const cart = await cartModel.findOne({_id: id})
    res.status(200).json({ cart })
})
//ok
router.post( '/', authAdmin, async (req, res) => {
    const newCart = await cartModel.create({})
    res.status(201).json({status: "Carrito creado exitosamente.", newCart})
})
//ok
router.post("/:cid/product/:pid", async (req, res) => {
    const cartID = req.params.cid
    const productID = req.params.pid
    const quantity= req.body.quantity || 1
    const cart = await cartModel.findById(cartID)

    let productFound = false
    for (let i = 0; i < cart.products.length; i++) {
        if (cart.products[i].id == productID) {
            cart.products[i].quantity++
            productFound = true
            break
        }
    }
    if (productFound == false) {
        cart.products.push({ id: productID, quantity})
    }
    await cart.save()
    res.status(200).json({status: "Success", cart})
})
//ok
router.delete( '/:cid/product/:pid', authAdmin, async (req, res) => {
    const cartID = req.params.cid
    const productID = req.params.pid

    const cart = await cartModel.findById(cartID)
    if(!cart) return res.status(404).json({status: "404", error: "Carrito no encontrado."})

    const productIDX = cart.products.findIndex(p => p.id == productID)
    
    if (productIDX <= 0) return res.status(404).json({status: "404", error: "Producto no encontrado en el carrito."})

    cart.products = cart.products.splice(productIDX, 1)
    await cart.save()
    
    res.status(200).json({status: "Success", cart})
})

export default router