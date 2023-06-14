import mongoose from 'mongoose';
import * as dotenv from 'dotenv'
dotenv.config()

export default function connectDB()
{
  mongoose.connect(process.env.dburi)
    .then(() => console.log('Connected to mongodb!'))
    .catch(e=>console.error('Error connecting to mongodb: ',e))
}