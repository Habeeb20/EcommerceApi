const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('./verifyToken');

const router = require('express').Router();
const Cryptojs = require('crypto');
const Product = require("../models/product")

router.post("/", verifyTokenAndAdmin, async (req, res) => {
    const newProduct = new Product(req, res);

    try {
        const savedProduct = await newProduct.save();
        res.status(200).json(savedProduct)
    } catch (error) {
        res.status(500).json(error)
        
    }
})

router.put("/:id",verifyTokenAndAdmin, async (req, res) => {

    try {
        const updatedProduct = await User.findByIdAndUpdate(req.params.id, {
            $set:req.body
        },
        {now:true}
        );
        res.status(200).json(updatedProduct)
    } catch (error) {
        res.status(500).json(err)
    }
  

});

router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id)
        res.status(200).json("product has been deleted")
    } catch (error) {
        res.status(500).json(err)
        
    }
});

router.get("/find/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)

        res.status(200).json(product)

    } catch (error) {
        res.status(500).json(error)
        
    }
})



router.get("/", async (req, res) => {
    const qNew = req.query.new
    const qCategory = req.query.category;
    try {
        let products;

        if(qNew){
            products = await Product.find().sort({createAt: -1}).limit(5)
        }else if (qCategory){
            products = await Product.find({
                categories: {
                    $in: [qCategory],
                }
            });

        } else {
            products = await Product.find();
        }
        const product = query ? await Product.find().sort({_id: -1 }).limit(5) : await User.find();

        res.status(200).json({users})
        
    } catch (error) {
        res.status(500).json(err)
        
    }
});
 module.exports= router