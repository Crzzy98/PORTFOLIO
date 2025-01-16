const mongoose = require("mongoose")

const Schema = mongoose.Schema

const sceneSchema = new Schema({
    url: {
        type: String,
        required: true
    }
})

const Scene = mongoose.model("scenes", sceneSchema)

module.exports = Scene