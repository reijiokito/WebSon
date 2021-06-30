import mongoose from "mongoose";

const newSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    thumbnail: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});

module.exports =  mongoose.model("New", newSchema);
 
