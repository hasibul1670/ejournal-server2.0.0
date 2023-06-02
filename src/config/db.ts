import mongoose from 'mongoose'
import { mongoDbUrl } from '../secret'

export const connectDB = async (options = {}) => {
  try {
    await mongoose.connect(mongoDbUrl, options)
    console.log('Connection established in DB')
    mongoose.connection.on('error', err => {
      console.error('DB connection error', err)
    })
  } catch (err: any) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    console.log('could not connect to Mongo', err.toString())
  }
}
