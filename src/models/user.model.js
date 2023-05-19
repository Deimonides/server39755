import mongoose, { Mongoose } from "mongoose"
const userCollection = 'users'
// const userCollection = 'users_test'

const userSchema = new mongoose.Schema({
    name:     String, //{ type: String, required: false },
    lastname: String, //{ type: String, required: false },
    email:    String, //{ type: String, required: true  },
    password: String, //{ type: String, required: false },
    role:     String, //{ type: String, required: true  },
    active:   Boolean, //{ type: String, required: true  },
})

mongoose.set('strictQuery', false)

const userModel = mongoose.model(userCollection, userSchema)

export default userModel