import express from 'express'
import dotenv from 'dotenv';
import colors from 'colors'
import dbConnection from './config/db.js';
import authRoute from './routes/authRoute.js'

import morgan from 'morgan';

// rest object
const app = express()

// config dotenv
dotenv.config()

//Datbase connection called
dbConnection();

// configure morgan 

app.use(morgan('dev'));

app.use(express.json());



app.use("/api/v1/auth",authRoute)



const PORT = process.env.PORT || 8080

// app.get("/register",(req,res)=>{
//     res.send("<h1>Register page called</h1>")
// })



app.listen(PORT,()=>{
    console.log(`Server is running on PORT ${PORT}`.bgYellow.blue)
})