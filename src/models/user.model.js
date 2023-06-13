import mongoose, { Mongoose } from "mongoose"
const userCollection = 'users'
// const userCollection = 'users_test'

const userSchema = new mongoose.Schema({
    first_name: String, //{ type: String, required: false },
    last_name:  String, //{ type: String, required: false },
    email:      String, //{ type: String, required: true  },
    password:   String, //{ type: String, required: false },
    age:        Number, //{ type: String, required: false },
    cart:       String, //{ type: String, required: true  },
    role:       String, //{ type: String, required: true  },
})

mongoose.set('strictQuery', false)

const userModel = mongoose.model(userCollection, userSchema)

export default userModel