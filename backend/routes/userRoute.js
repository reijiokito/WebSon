import express from'express';
import User from '../models/userModel';
import { getToken } from '../utils';

const router = express.Router();

router.post('/signin', async(req, res) => {
    console.log("req body:"+req.body);
    const signinUser = await User.findOne({
        email: req.body.email,
        password: req.body.password
    });
    if (signinUser){
        res.send({
            _id: signinUser.id,
            name: signinUser.name,
            email: signinUser.email,
            isAdmin: signinUser.isAdmin,
            token: getToken(signinUser)
        })
    } else {
        res.status(401).send({msg:"Invalid Email or Password!"})
    }
});

router.post("/createadmin", async(req,res) => {
    try{
        const user = new User({
            name: 'admin@admin',
            email: 'admin@admin',
            password: 'admin@admin',
            isAdmin: true
        });
        console.log(user);
        const newUser = await user.save();
        res.send(user);
    }catch(e){
        res.send({msg: e.message});
    }
});

export default router;