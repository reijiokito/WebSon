import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        dropDups: true
    },
    password: {
        type: String,
        required: true
    },
    isadmin: {
        type: Boolean,
        required: true,
        default: false
    }
});

module.exports = mongoose.model("User", userSchema);
