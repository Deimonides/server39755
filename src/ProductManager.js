// const fs = require('fs')
import fs from 'fs'
// const socketClient = io()
export default class ProductManager {
    #products
    
    constructor(pathFile) {
        this.#products = []
        this.path = pathFile
    }
   
    newId() { // busca y valida un nuevo ID para asignar
        let idExists
        if (this.#products.length == 0) { // si el array está vacío
            return 1
        } else {
            let i = (this.#products.length) + 1 // siguiente id posible, en base al tamaño del array
            do {
                let findId = this.#products.some( prod => prod.id === i )
                findId && i++ // si el posible id ya existe, incrementar a la busqueda
            } while (idExists == false) // cuando no coincida
            return i
        }
    }
    
// getters

    getIndexOfId (idnum) {
        let indexOfId = this.#products.findIndex( prod => prod.id === idnum )
        if (indexOfId < 0 ) return { "Error": "Product not found" } // si no existe el id, devolvió -1
        //console.log('++++++++++++++++indexOfId: ', indexOfId)
        return indexOfId
    }
    
    getProducts() {
        let objProducts, strProducts
        //!fs.existsSync(this.path) && (objProducts = 'Archivo not faund')
        if ( fs.existsSync(this.path) ) {
            strProducts = fs.readFileSync( this.path, 'utf-8' )
            if (strProducts == "") return [] // validar si hay contenido
            objProducts = JSON.parse(strProducts, 'utf-8');
            return objProducts
        } else {
            //console.log('No se encuentra el archivo.')
            return []
        }
    }
    
    getProductById(idnum) {
        this.#products = this.getProducts()
        let product = this.#products.find(objeto => objeto.id === idnum)             
        //return product ? product : `<h1 style="color:red">Producto no encontrado.</h1>`
        return product ? product : null
    }

// setters

    saveProducts (arrayOfProducts) {
        fs.writeFileSync( this.path, JSON.stringify(arrayOfProducts, null, '\t'), 'utf-8' )
    }

    addProduct ( title, description, code, price, status, stock, category, thumbnails ) {
        // traer productos
        this.#products = this.getProducts()
        // buscar nuevo id
        let id = this.newId() // buscar ID disponible para el nuevo producto
        let newProduct = { id, title, description, code, price, status, stock, category, thumbnails }
        this.#products.push(newProduct)
        // grabar todos los productos incluyendo el nuevo producto
        this.saveProducts(this.#products)
    }

    updateProductById (id, field, newValue) {
        this.#products = this.getProducts() 
        let productId = this.#products.find(p => p.id === id) // buscar el producto por id
        if (productId) {
            productId[field] = newValue // asignarle el nuevo valor al campo indicado
            // guardar todos los productos incluyendo el producto modificado
            this.saveProducts(this.#products)
        } else {
            console.log(`<< Error al intentar modificar: producto con ID "${id}" no encontrado. >>`)
        }
    }
    
    deleteProductByID = (id) => { // eliminar producto segun su id
        this.#products = this.getProducts()
        const array = this.#products.splice ( this.getIndexOfId(id), 1 )
        this.saveProducts(this.#products)
    }

} //end of Class: ProductManager

// module.exports = ProductManager