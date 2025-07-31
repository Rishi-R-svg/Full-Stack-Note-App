import mongoose from "mongoose";
import dotenv from "dotenv";


dotenv.config()

 const connectDB = async () => {
    try {
        await mongoose.connect(process.env.Db_STRING)
        console.log('MONDODB CONNECTED')

    } catch (error) {
        console.log('FAILED TO CONNECT TO THE SERVER',error)
    }
 }


 export {connectDB}