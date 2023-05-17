import mongoose, { Mongoose } from "mongoose"
//import mongoosePaginate from "mongoose-paginate-v2"
const usersCollection = 'users'
// const productsCollection = 'prod_test'

const userSchema = new mongoose.Schema({
    mail:     { type: String}, //, required: true  },
    password: { type: String}, //, required: false },
    role:     { type: String}, //, required: true  },
    status:   { type: String}, //, required: true  },
})

userSchema.plugin(mongoosePaginate)
// productSchema.plugin(aggregatePaginate)

const userModel = mongoose.model(usersCollection, userSchema)

export default userModel