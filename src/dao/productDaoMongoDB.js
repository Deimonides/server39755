import mongoose from 'mongoose';
import productModel from "../models/product.model.js";

export default class ProductDaoDB {

    constructor() {
        this.model = mongoose.model(productModel.collectionName, userModel.schema);
    }

    createOne = async(product) => {
        let result = await this.model.create(user)
        return result
    }

    readAll = async() => {
        let result = await this.model.find()
        return result
    }

    updateOne = async(productId) => {

    }

    deleteOne = async(productId) => {

    }

}