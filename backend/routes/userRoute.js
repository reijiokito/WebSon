import express from'express';
import User from '../models/userModel';
import { getToken } from '../utils';

const router = express.Router();

router.post('/signin', async(req, res) => {
    console.log(req.body);
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

router.get("/createadmin", async(req,res) => {
    try{
        const user = new User({
            name: 'CongPro',
            email: 'anhcong9x00@gmail.com',
            password: '123456',
            isAdmin: true
        });
    
        const newUser = await user.save();
        res.send(user);
    }catch(e){
        res.send({msg: e.message});
    }
});

export default router