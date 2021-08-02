const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const ServicePackage = require('../models/ServicePackageModel');



//Get all
router.get("/", async (req, res, next) => {
    const servicePackages = await ServicePackage.find().popuplate('Product');
    if (servicePackages){
        res.json({
            message: 'Handleing GET request to /servicePackages',
            servicePackages
        });
    } else {
        res.json({message: "No services"});
    }
});

//Get by Id
router.get("/:servicePackageId", async (req, res, next) => {
    const id = req.params.servicePackageId;
    const servicePackage = await ServicePackage.findById(id).populate('Product');
    if (servicePackage){
        res.json({
            message: "Handling GET servicePackage",
            servicePackage
        });
    } else {
        res.json({message: "No servicePackage"});
    }     
});

router.post('/', async(req, res, next) => {

    if (req.file === undefined) return res.send("You must select a file");
    if (req.body){
        const servicePackage = new ServicePackage({
            name: req.body.name,
            brand: req.body.brand,
            description: req.body.description,
            products: req.body.products
        });
        const createdServicePackage = await servicePackage.save();
        console.log(createdServicePackage);
        if (createdServicePackage){
            res.json({
                message: "Handling POST request to /servicePackages",
                createdServicePackage
            })
        } else {
            res.json({message: "Create servicePackage fails"});
        }
    } else {
        res.json({message: "No body"})
    }
    
});

router.delete("/:servicePackageId", async(req, res, next) => {
    const id = req.params.servicePackageId;
    const servicePackage = await ServicePackage.deleteOne({_id: id},
        {
            name: req.body.name,
            brand: req.body.brand,
            description: req.body.description,
            products: req.body.products
        });
    if (servicePackage){
        res.json({message: "Delete success"});
    } else {
        res.json({message: "Delete fails"})
    }
});

router.put("/:servicePackageId", async(req, res, next)=> {
    const id = req.params.servicePackageId;
    const servicePackage = await ServicePackage.updateOne({_id:id});
    if (servicePackage){
        res.json({message: "Update success"});
    } else {
        res.json({message: "Update fails"})
    }
});

module.exports = router;

