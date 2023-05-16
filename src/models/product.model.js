import mongoose, { Mongoose } from "mongoose"
import mongoosePaginate from "mongoose-paginate-v2"
import aggregatePaginate from "mongoose-aggregate-paginate-v2"
const productsCollection = 'products'
// const productsCollection = 'prod_test'

const productSchema = new mongoose.Schema({
    title:          { type: String, required: true  },
    description:    { type: String, required: false },
    code:           { type: String, required: true  },
    price:          { type: Number, required: true  },
    stock:          { type: Number, required: false },
    category:       { type: String, required: true  },
    thumbnails:     { type: Array,  required: true  },
})

productSchema.plugin(mongoosePaginate)
// productSchema.plugin(aggregatePaginate)

const productModel = mongoose.model(productsCollection, productSchema)

export default productModel