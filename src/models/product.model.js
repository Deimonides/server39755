import mongoose from "mongoose"
const productsCollection = 'products'

const productSchema = new mongoose.Schema({
    id: Number,
    title: String,
    description: String,
    code: String,
    price: Number,
    stock: Number,
    category: String,
    thumbnails: String,
    
})

const productModel = mongoose.model(productsCollection, productSchema)

export default productModel