import mongoose from "mongoose"
const productsCollection = 'products'

const productSchema = new mongoose.Schema({
    
    title:          {type: String, required: true},
    description:    {type: String, required: false},
    code:           {type: String, required: true},
    price:          {type: Number, required: true},
    stock:          {type: Number, required: false},
    category:       {type: String, required: true},
    thumbnails:     {type: Array, required: true},
})

const productModel = mongoose.model(productsCollection, productSchema)

export default productModel