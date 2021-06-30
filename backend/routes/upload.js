// const upload = require('../middleware/upload');
const express = require('express');
const multer = require('multer');
const router = express.Router();
const upload = require('../middleware/upload');
// const upload = multer({dest: "uploads/"});


router.post("/upload", upload.single("file"), (req, res) => {
    if (req.file === undefined) return res.send("You must select a file");
    const imgUrl = `http://localhost:6969/uploads/${req.file.filename}`;
    return res.send(imgUrl);
});

// //media routes
// router.get("/:filename", async (req, res) => {
//     console.log(req.params.filename);
//     try {
//         const file = await gfs.files.fineOne({ filename: req.params.filename });
//         console.log(file);
//         const readStream = gfs.createReadStream(file.filename);
//         readStream.pipe(res);
//     } catch (e) {
//         res.send("Image not found");
//     }
// });

router.delete("/:filename", async(req, res) => {
    try{
        await gfs.files.deleteOne({filename: req.params.filename});
        res.send("Success");
    }catch(e){  
        res.send("Delete Error"); 
        
    }
})
module.exports = router;