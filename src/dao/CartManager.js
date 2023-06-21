// const fs = require('fs');
import fs from 'fs'

class CartManager {
    #carts
    
    constructor(pathFile) {
        this.#carts = []
        this.path = pathFile
    }
   
    newId() { // busca y valida un nuevo ID para asignar
        let idExists
        if (this.#carts.length == 0) { // si el array está vacío
            return 1
        } else {
            let i = (this.#carts.length) + 1 // siguiente id posible, en base al tamaño del array
            do {
                let findId = this.#carts.some( prod => prod.id === i )
                findId && i++ // si el posible id ya existe, incrementar a la busqueda
            } while (idExists == false) // cuando no coincida
            return i
        }
    }
    
// FILES
    
    read() {
        if ( fs.existsSync(this.path) ) {
            const strCarts = fs.readFileSync( this.path, 'utf-8' )
            if (strCarts == "") return [] // validar si hay contenido
            const objCarts = JSON.parse(strCarts, 'utf-8');
            return objCarts
        } else {
            return []
        }
    }

    write (arrayOfCarts) {
        fs.writeFileSync( this.path, JSON.stringify(arrayOfCarts, null, '\t'), 'utf-8' )
    }


// CRUD

    get = async () => {
        const data = await this.read()
        return data
    }

    getById = async (id) => {
        const data = await this.read()
        data.find(c => c.id == id)
        return data ? data : null
    }
    

    create = async () => {
        // traer productos
        const carts = await this.read()
        // buscar nuevo id
        const newId = this.newId() // buscar ID disponible para el nuevo producto
        const newCart = { 
            id: newId,
            products: []
        }
        carts.push(newCart)
        // grabar todos los productos incluyendo el nuevo producto
        await this.write(carts)
        return newCart
    }

    update = async (id, obj) => {
        obj.id = id
        const carts = await this.read()
        for (let i = 0; i < carts.length; i++) {
            if (carts[i].id == id) {
                carts[i] = obj
                await this.write(carts)
                break
            }
        }
    }

    addProduct = async (cartId, productId) => {
        const cart = await this.getById(cartId)
        let found = false
        for (let i = 0; i < cart.products.length; i++) {
            if (cart.products[i].id == productId) {
                cart.products[i].quantity++
                found = true
                break
            }
        }
        if (found == false) {
            cart.products.push({ id: productId, quantity: 1 })
        }
        await this.update(cartId, cart)
        return cart
    }

} //end of Class: CartManager

export default CartManager