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

const contactModel = mongoose.model("contact", contactSchema);
 
export default userModel;