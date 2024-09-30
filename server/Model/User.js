const mongoose =require("mongoose")

const user= new mongoose.Schema({

    name:String,
    age:String,
    city:String,
})

module.exports = new mongoose.model("User",user)