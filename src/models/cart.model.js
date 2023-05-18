import mongoose, { Mongoose } from "mongoose"
import mongoosePaginate from "mongoose-paginate-v2"
const cartsCollection = 'carts'
// const productsCollection = 'prod_test'

const cartSchema = new mongoose.Schema({
    cid:      { type: Number }, // , required: true  },
    user:     { type: String }, // , required: true  },
    state:    { type: String }, // , required: false },
    total:    { type: Number }, // , required: false },
    products: { type: Array  }, // , required: false },
})

cartSchema.plugin(mongoosePaginate)

mongoose.set('strictQuery', false)

const cartModel = mongoose.model(cartsCollection, cartSchema)

export default cartModel