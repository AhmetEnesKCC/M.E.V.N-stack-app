const mongoose = require("mongoose")
const Schema =  mongoose.Schema

let Todo = new Schema(
    {
        todo : {
            type : String
        },
        completed : {
            type:  Boolean
        },
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model("Todo", Todo);