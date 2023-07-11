import mongoose from 'mongoose';
import dotenv from 'dotenv';

export default class MongoClient {
    constructor() {
        this.connected = true
        this.client = mongoose
    }

    connect = async() => {
        try {
            await this.client.connect(xxxxxxxxxx)
        } catch (error) {
            
        }
    }
}