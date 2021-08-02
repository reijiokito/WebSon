import mongoose from "mongoose";

const servicePackageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    products: [
        {
            type: String
            // type: Schema.Types.ObjectId,
            // ref: 'Product'
        }
    ],

});

module.exports = mongoose.model("ServicePackage", servicePackageSchema);