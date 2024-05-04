const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('./verifyToken');

const router = require('express').Router();
const Cryptojs = require('crypto');
const Order = require("../models/order")

router.post("/", verifyToken, async (req, res) => {
    const newOrder = new Order(req, res);

    try {
        const savedOrder = await newOrder.save();
        res.status(200).json(savedOrder)
    } catch (error) {
        res.status(500).json(error)
        
    }
})

router.put("/:id",verifyTokenAndAdmin, async (req, res) => {

    try {
        const updatedOrder = await User.findByIdAndUpdate(req.params.id, {
            $set:req.body,
        },
        {now:true}
        );
        res.status(200).json(updatedOrder)
    } catch (error) {
        res.status(500).json(err)
    }
  

});

router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        await Order.findByIdAndDelete(req.params.id)
        res.status(200).json("Order has been deleted")
    } catch (error) {
        res.status(500).json(err)
        
    }
});

router.get("/find/:userId",verifyTokenAndAuthorization, async (req, res) => {
    try {
        const orders = await Order.find({userId: req.params.userId})

        res.status(200).json(orders)

    } catch (error) {
        res.status(500).json(error)
        
    }
})



router.get("/",verifyTokenAndAdmin, async (req, res) => {
    try {
        const orders = await Order.find()
        res.status(200).json(orders)
    } catch (error) {
        res.status(500).json(error)
        
    }
});


router.get("income", verifyTokenAndAdmin, async (req, res) => {
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1))
    const previousMonth = new Date(date.setMonth(lastMonth.getMonth() - 1));

    try {
        const income = await Order.aggregate([
            { $match: {createdAt: {$gte: previousMonth}}},
            {
                $project:{
                    month: {$month: "$createdAt"},
                    sales: "amount",
                },
            },
            {
                $group:{
                    _id:"$month",
                    total:{$sum: "$sales"},
                }
             }
            
        ]);
        res.send(200).json(income)
    } catch (error) {
        res.status(500).json(error)
        
    }
})
    
 module.exports= router;