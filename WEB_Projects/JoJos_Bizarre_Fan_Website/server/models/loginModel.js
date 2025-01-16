const mongoose = require("mongoose")

const Schema = mongoose.Schema

const userSchema = new Schema({
    userName: {
        type: String,
        required: true
    },
    password: {
        type: String, 
        required: true
    }
})

const UserLogin = mongoose.model("users", userSchema)

module.exports = UserLogin