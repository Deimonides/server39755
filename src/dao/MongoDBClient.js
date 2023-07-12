import mongoose from 'mongoose';
import { Command } from 'commander'
import dotenv from 'dotenv';

export default class MongoClient {
    constructor() {
        this.connected = true
        this.client = mongoose
    }

    connect = async() => {
        //
        const program = new Command()
        program
            .option('-p <port>', 'Port to connect', 8080)
            .option('--mode <mode>', 'description', 'development')
        program.parse()

        dotenv.config({
            path: (program.opts().mode === 'development') ? './.env.development' : './.env.production'
        })
        const MONGO_URI = process.env.MONGO_URI
            // console.log('MONGO_URI (client): ', MONGO_URI);
        mongoose.set('strictQuery', false)



        try {
            await this.client.connect(MONGO_URI)
            // await this.client.connect('mongodb+srv://')
            // console.log('[mongodb] Base de Datos conectada.');
            console.log(process.env.MSG_LOG);
        } catch (error) {
            throw new Error('[mongodb] Error conectando a MongoDB...')
        }
    }
}