const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const Feedback = require('../models/FeedbackModel');



//Get all
router.get("/", async (req, res, next) => {
    const feedbacks = await New.find();
    if (feedbacks){
        res.json({
            message: 'Handleing GET request to /feedbacks',
            feedbacks
        });
    } else {
        res.json({message: "No feedbacks"});
    }
});

//Get by Id
router.get("/:feedbackId", async (req, res, next) => {
    const id = req.params.feedbackId;
    const feedback = await New.findById(id);
    if (feedback){
        res.json({
            message: "Handling GET feedbacks",
            feedback
        });
    } else {
        res.json({message: "No feedback"});
    }     
});

router.post('/', upload.single("image") , async(req, res, next) => {

    if (req.file === undefined) return res.send("You must select a file");
    if (req.body){
        const feedback = new Feedback({
            title: req.body.title,
            thumbnail: req.file.path,
            description: req.body.description,
        });
        const createdFeedback = await feedback.save();
        console.log(createdFeedback);
        if (createdFeedback){
            res.json({
                message: "Handling POST request to /feedbacks",
                createdFeedback
            })
        } else {
            res.json({message: "Create feedbacks fails"});
        }
    } else {
        res.json({message: "No body"})
    }
    
});

router.delete("/:feedbackId", async(req, res, next) => {
    const id = req.params.feedbackId;
    const feedback = await Feedback.deleteOne({_id: id});
    if (feedback){
        res.json({message: "Delete success"});
    } else {
        res.json({message: "Delete fails"})
    }
});

router.put("/:feedbackId", async(req, res, next)=> {
    const id = req.params.feedbackId;
    const feedback = await Feedback.updateOne({_id:id},
        {
            title: req.body.title,
            thumbnail: req.file.path,
            description: req.body.description,
        });
    if (feedback){
        res.json({message: "Update success"});
    } else {
        res.json({message: "Update fails"})
    }
});

module.exports = router;

