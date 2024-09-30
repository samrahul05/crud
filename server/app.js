const { json } = require('body-parser')
const express =require('express')
const app = express()
const mongoose = require("mongoose")
require("dotenv").config()
const cors = require('cors')
const router = require('./Routes/Router.js')
// mongodb connection 
mongoose.connect(process.env.DBURL)
.then(()=>{
    console.log("DB is Connected");
})
.catch(()=>{
    console.log("DB is Connected");
})


// middlewares 

app.use(express.urlencoded({extended:false}))
app.use(cors({
    origin:"*",
    methods:["GET","PUT","POST","DELETE"],
}))
app.use(express.json())
app.use('/api',router)


// server listing 
app.listen(process.env.PORT,()=>{
    console.log(`server is running in ${process.env.PORT}`)
})