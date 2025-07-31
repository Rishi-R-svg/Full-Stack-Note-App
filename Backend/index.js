import express from "express";
import { connectDB } from "./db/db.js";
import cors from 'cors'

import dotenv from "dotenv"

dotenv.config()

const app = express();

connectDB()







const port = process.env.PORT;

app.use(express.json())
app.use(cors({
    origin: `${process.env.FRONTEND_URL} `,
    credentials: true
}))


import { userRouter } from "./routes/user.route.js";

import { notesRouter } from "./routes/notes.route.js";


app.use('/api/user',userRouter)

app.use('/api/notes',notesRouter)






app.listen(port,()=>{
    console.log('server is running on',port)
})



