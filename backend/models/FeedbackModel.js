import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
    avatar_img: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    user_name:{
        type: String,
        required: true
    },
    phone_number:{
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Feedback", feedbackSchema);
