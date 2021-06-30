const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const Product = require('../models/ProductModel');



//Get all
router.get("/", async (req, res, next) => {
    const products = await Product.find();
    console.log(products);
    if (products){
        res.json({
            message: 'Handleing GET request to /product',
            products: products
        });
    } else {
        res.json({message: "No products"});
    }
});

//Get by Id
router.get("/:productId", async (req, res, next) => {
    const id = req.params.productId;
    const product = await Product.findById(id);
    if (product){
        res.json({
            message: "Handling GET product",
            product: product
        });
    } else {
        res.json({message: "No Product"});
    }     
});

router.post('/', upload.single("image") , async(req, res, next) => {

    if (req.file === undefined) return res.send("You must select a file");
    if (req.body){
        const product = new Product({
            name: req.body.name,
            image: req.file.path,
            type: req.body.type,
            brand: req.body.brand,
            isActive: req.body.isActive
        });
        const createdProduct = await product.save();
        console.log(createdProduct);
        if (createdProduct){
            res.json({
                message: "Handling POST request to /products",
                createdProduct: createdProduct
            })
        } else {
            res.json({message: "Create product fails"});
        }
    } else {
        res.json({message: "No body"})
    }
    
});

router.delete("/:productId", async(req, res, next) => {
    const id = req.params.productId;
    const product = await Product.deleteOne({_id: id});
    if (product){
        res.json({message: "Delete success"});
    } else {
        res.json({message: "Delete fails"})
    }
});

module.exports = router;

