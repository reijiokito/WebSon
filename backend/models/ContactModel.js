import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    value: {
        type: String,
        required: true,
        unique: true,
        dropDups: true
    },
    description: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Contact", contactSchema);
 
