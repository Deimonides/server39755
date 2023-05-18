import mongoose, { Mongoose } from "mongoose"
const userCollection = 'users'
// const userCollection = 'users_test'

const userSchema = new mongoose.Schema({
    mail:     { type: String}, //, required: true  },
    password: { type: String}, //, required: false },
    role:     { type: String}, //, required: true  },
    status:   { type: String}, //, required: true  },
})

mongoose.set('strictQuery', false)

const userModel = mongoose.model(userCollection, userSchema)

export default userModel