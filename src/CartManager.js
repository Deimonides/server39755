const fs = require('fs');
//import fs from 'fs'

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
    
// getters

    getIndexOfCid (cid) {
        let indexOfCid = this.#carts.findIndex( item => item.id === cid )
            console.log('');
        if (indexOfCid < 0 ) return { "Error": "Cart not found" } // si no existe el id, devolvió -1
        return indexOfCid
    }
    
    getCarts() {
        let objCarts, strCarts
        if ( fs.existsSync(this.path) ) {
            strCarts = fs.readFileSync( this.path, 'utf-8' )
            if (strCarts == "") return [] // validar si hay contenido
            objCarts = JSON.parse(strCarts, 'utf-8');
            return objCarts
        } else {
            return []
        }
    }
    
    getCartById(cidnum) {
        this.#carts = this.getCarts()
        let arrCart = this.#carts.find( item => item.id === cidnum)             
        return arrCart ? arrCart : null
    }
    
// setters

    saveCarts (arrayOfCarts) {
        fs.writeFileSync( this.path, JSON.stringify(arrayOfCarts, null, '\t'), 'utf-8' )
    }

    newCart( user ) {
        // traer productos
        this.#carts = this.getCarts()
        // buscar nuevo id
        let id = this.newId() // buscar ID disponible para el nuevo producto
        let products = []
        let payed = false
        let newCart = { id, user , payed, products }
        this.#carts.push(newCart)
        // grabar todos los productos incluyendo el nuevo producto
        this.saveCarts(this.#carts)
    }

    deleteCartByID = (cid) => { // eliminar producto segun su id
        this.#carts = this.getCarts()
        this.#carts.splice( this.getIndexOfCid(cid), 1 )
        this.saveCarts(this.#carts)
    }

} //end of Class: CartManager

module.exports = CartManager