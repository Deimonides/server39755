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

    getIndexOfId (idnum) {
        let indexOfId = this.#carts.findIndex( prod => prod.id === idnum )
        if (indexOfId < 0 ) return { "Error": "Product not found" } // si no existe el id, devolvió -1
        //console.log('++++++++++++++++indexOfId: ', indexOfId)
        return indexOfId
    }
    
    getCarts() {
        let objCarts, strCarts
        //!fs.existsSync(this.path) && (objProducts = 'Archivo not faund')
        if ( fs.existsSync(this.path) ) {
            strCarts = fs.readFileSync( this.path, 'utf-8' )
            if (strCarts == "") return [] // validar si hay contenido
            objCarts = JSON.parse(strCarts, 'utf-8');
            return objCarts
        } else {
            //console.log('No se encuentra el archivo.')
            return []
        }
    }
    
    getProductById(idnum) {
        this.#carts = this.getProducts()
        let product = this.#carts.find(objeto => objeto.id === idnum)             
        //return product ? product : `<h1 style="color:red">Producto no encontrado.</h1>`
        return product ? product : null
    }

// setters

    saveCarts (arrayOfCarts) {
        fs.writeFileSync( this.path, JSON.stringify(arrayOfCarts, null, '\t'), 'utf-8' )
    }

    addCart ( user ) {
        
        // if( !title || !description || !code || !price || !status || !stock || !category ) { // validacion de campos obligatorios
        //     console.error('Error: faltan campos obligatorios')
        //     return;
        // }
        // traer productos
        this.#carts = this.getCarts()
        // buscar nuevo id
        let id = this.newId() // buscar ID disponible para el nuevo producto
        let products = []
        let newCart = { id, user , products }
        this.#carts.push(newCart)
        // grabar todos los productos incluyendo el nuevo producto
        this.saveCarts(this.#carts)
    }

    updateProductById (id, field, newValue) {
        this.#carts = this.getProducts() 
        let productId = this.#carts.find(p => p.id === id) // buscar el producto por id
        if (productId) {
            productId[field] = newValue // asignarle el nuevo valor al campo indicado
            // guardar todos los productos incluyendo el producto modificado
            this.saveProducts(this.#carts)
        } else {
            console.log(`<< Error al intentar modificar: producto con ID "${id}" no encontrado. >>`)
        }
    }
    
    deleteProductByID = (id) => { // eliminar producto segun su id
        this.#carts = this.getProducts()
        const array = this.#carts.splice ( this.getIndexOfId(id), 1 )
        
        this.saveProducts(this.#carts)
    }

} //end of Class: ProductManager

module.exports = CartManager











// *********************
// * TESTEO DEL SCRIPT *
// *********************

// console.clear();
// console.log( "----------------------------------------------------------------" )
// console.log( "----------------------------------------------------------------" )

// crear nuevos producto
//const productManager = new ProductManager('./productos.txt')

// productManager.addProduct('Producto_1', 'Descripcion_1', 10000, 5, 'https://prod1.jpg')
// productManager.addProduct('Producto_2', 'Descripcion_2', 10000, 5, 'https://prod2.jpg')
// productManager.addProduct('Producto_3', 'Descripcion_3', 10000, 5, 'https://prod3.jpg')
// productManager.addProduct('Producto_4', 'Descripcion_4', 10000, 5, 'https://prod4.jpg')
// console.log( 'Archivo creado. Productos agregados.' )
// console.log( "----------------------------------------------------------------" )

// // mostrar contenido
// console.log( 'Detalle de productos en inventario: ');
// console.log(productManager.getProducts())
// console.log( "----------------------------------------------------------------" )

// // Detalle del producto segun su id
// console.log('Detalle del producto con ID 2: ') 
// console.log( productManager.getProductById(2))
// console.log('Detalle del producto con ID 9: ')
// console.log( productManager.getProductById(9))
// console.log( "----------------------------------------------------------------" )

// // modificar un producto
// productManager.updateProductById(999, "price", 25000)
// productManager.updateProductById(2, "price", 25000)
// console.log( 'Detalle de productos en inventario: ');
// console.log(productManager.getProducts())
// console.log( "----------------------------------------------------------------" )


// // Eliminar un producto segun su id
// console.log('Eliminando Producto con ID 1...')
// productManager.deletePdoductByID(1)
// console.log('Eliminando Producto con ID 3...')
// productManager.deletePdoductByID(3)
// console.log( 'Detalle de productos en inventario: ');
// console.log(productManager.getProducts())
// console.log( "----------------------------------------------------------------" )
