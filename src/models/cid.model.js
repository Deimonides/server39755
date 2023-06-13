import mongoose, { Mongoose } from "mongoose"
import mongoosePaginate from "mongoose-paginate-v2"
const cidCollection = 'cid'

const cidSchema = new mongoose.Schema({
    cid:      { type: Number }, // , required: true  },
})

cidSchema.plugin(mongoosePaginate)

mongoose.set('strictQuery', false)

const cidModel = mongoose.model(cidCollection, cidSchema)

export default cidModel