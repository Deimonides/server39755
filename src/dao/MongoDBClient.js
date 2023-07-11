import mongoose from 'mongoose';
import dotenv from 'dotenv';

export default class MongoClient {
    constructor() {
        this.connected = true
        this.client = mongoose
        const MONGO_URI = process.env.MONGO_URI
            console.log('MONGO_URI (client): ', MONGO_URI);
        mongoose.set('strictQuery', false)
    }

    connect = async() => {
        try {
            // await this.client.connect(MONGO_URI)
            await this.client.connect('mongodb+srv://')
            console.log('[mongodb] Base de Datos conectada.');
        } catch (error) {
            throw new Error('[mongodb] Error conectando a MongoDB...')
        }
    }
}