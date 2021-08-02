const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const Service = require('../models/ServiceModel');



//Get all
router.get("/", async (req, res, next) => {
    const services = await Service.find();
    if (services){
        res.json({
            message: 'Handleing GET request to /services',
            services
        });
    } else {
        res.json({message: "No services"});
    }
});

//Get by Id
router.get("/:serviceId", async (req, res, next) => {
    const id = req.params.serviceId;
    const service = await Service.findById(id);
    if (service){
        res.json({
            message: "Handling GET service",
            service
        });
    } else {
        res.json({message: "No service"});
    }     
});

router.post('/', async(req, res, next) => {

    if (req.file === undefined) return res.send("You must select a file");
    if (req.body){
        const service = new Service({
            name: req.body.name,
            brand: req.body.brand,
            description: req.body.description,
        });
        const createdService = await service.save();
        console.log(createdService);
        if (createdService){
            res.json({
                message: "Handling POST request to /services",
                createdService
            })
        } else {
            res.json({message: "Create service fails"});
        }
    } else {
        res.json({message: "No body"})
    }
    
});

router.delete("/:serviceId", async(req, res, next) => {
    const id = req.params.serviceId;
    const service = await Service.deleteOne({_id: id});
    if (service){
        res.json({message: "Delete success"});
    } else {
        res.json({message: "Delete fails"})
    }
});

router.put("/:serviceId", async(req, res, next)=> {
    const id = req.params.serviceId;
    const service = await Service.updateOne({_id:id},
        {
            name: req.body.name,
            brand: req.body.brand,
            description: req.body.description,
        });
    if (service){
        res.json({message: "Update success"});
    } else {
        res.json({message: "Update fails"})
    }
});

module.exports = router;

