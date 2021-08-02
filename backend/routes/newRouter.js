const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const New = require('../models/NewModel');



//Get all
router.get("/", async (req, res, next) => {
    const news = await New.find();
    if (news){
        res.json({
            message: 'Handleing GET request to /news',
            news
        });
    } else {
        res.json({message: "No News"});
    }
});

//Get by Id
router.get("/:newsId", async (req, res, next) => {
    const id = req.params.newsId;
    const news = await New.findById(id);
    if (news){
        res.json({
            message: "Handling GET news",
            news
        });
    } else {
        res.json({message: "No news"});
    }     
});

router.post('/', upload.single("thumbnail") , async(req, res, next) => {

    if (req.file === undefined) return res.send("You must select a file");
    if (req.body){
        const news = new New({
            title: req.body.title,
            thumbnail: req.file.path,
            description: req.body.description,
        });
        const createdNews = await news.save();
        console.log(createdNews);
        if (createdNews){
            res.json({
                message: "Handling POST request to /news",
                createdNews
            })
        } else {
            res.json({message: "Create news fails"});
        }
    } else {
        res.json({message: "No body"})
    }
    
});

router.delete("/:newsId", async(req, res, next) => {
    const id = req.params.newsId;
    const news = await New.deleteOne({_id: id},
        {
            title: req.body.title,
            thumbnail: req.file.path,
            description: req.body.description,
        });
    if (news){
        res.json({message: "Delete success"});
    } else {
        res.json({message: "Delete fails"})
    }
});

router.put("/:newsId", async(req, res, next)=> {
    const id = req.params.newsId;
    const news = await New.updateOne({_id:id});
    if (news){
        res.json({message: "Update success"});
    } else {
        res.json({message: "Update fails"})
    }
});

module.exports = router;

