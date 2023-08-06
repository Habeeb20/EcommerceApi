const router = require('express').Router();
const User = require('../models/users')
const Cryptojs = require('crypto')
const jwt = require('jsonwebtoken')

router.post("/register", async (req, res) => {
    const newUser = new User ({
        username: req.body.username,
        email: req.body.email,
        password: Cryptojs.AES.encrypt(req.body.password, "process.env.PASS_SEC").toString(),
    });

    try {
        const saveUser = await newUser.save();
        res.status(201).json(saveUser)    
    } catch (error) {
        res.status(500).json(error)
        
    }

    
})

router.post("/login", async(req, res) => {
    try {
        const user = await User.findOne({username: req.body.username});
        !user && res.status(401).json("wrong credentials!");


        const hashedPassword = Cryptojs.AES.decrypt(user.password, process.env.PASS_SEC);
        const Originalpassword = hashedPassword.toString(Cryptojs.enc.Utf8)

        Originalpassword !== req.body.password &&
         res.status(401).json("wrong credentials");

         const accessToken = jwt.sign({
            id:user._id, 
            isAdmin: user.isAdmin,
         }, process.env.JWT_SEC,
         {expiresIn:"3d"})

        const { password, ...others } = user.doc;


        res.status(200).json({...others, accessToken})



        
    } catch (error) {
        res.send(500).json(error)
        
    }
})

module.exports= router