const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('./verifyToken');

const router = require('express').Router();
const Cryptojs = require('crypto');
const Cart = require("../models/cart")

router.post("/", verifyToken, async (req, res) => {
    const newCart = new Product(req, res);

    try {
        const savedCart = await newCart.save();
        res.status(200).json(savedCart)
    } catch (error) {
        res.status(500).json(error)
        
    }
})

router.put("/:id",verifyTokenAndAuthorization, async (req, res) => {

    try {
        const updatedCart = await User.findByIdAndUpdate(req.params.id, {
            $set:req.body
        },
        {now:true}
        );
        res.status(200).json(updatedCart)
    } catch (error) {
        res.status(500).json(err)
    }
  

});

router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
        await Cart.findByIdAndDelete(req.params.id)
        res.status(200).json("user has been deleted")
    } catch (error) {
        res.status(500).json(err)
        
    }
});

router.get("/find/:userId",verifyTokenAndAuthorization, async (req, res) => {
    try {
        const cart = await Cart.findOne({userId: req.params.userId})

        res.status(200).json(cart)

    } catch (error) {
        res.status(500).json(error)
        
    }
})



router.get("/",verifyTokenAndAdmin, async (req, res) => {
    try {
        const carts = await Cart.find()
        res.status(200).json(carts)
    } catch (error) {
        res.status(500).json(error)
        
    }
})
    
 module.exports= router