const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require("dotenv")
const userRouter = require("./routes/users")
const authRouter = require("./routes/auth")
const productRouter = require("./routes/product")
const cartRouter = require("./routes/cart")
const orderRouter = require(".routes/order")
const cors = require("cors")
const stripeRoute = require(".route/stripe")

dotenv.config();

mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("your database is connected"))
    .catch((err) => { 
        console.log(err);
});
app.use(cors())
app.use('/api/user', userRouter)
app.use('api/auth', authRouter)
app.use('api/product', productRouter)
app.use('api/carts', cartRouter)
app.use('api/orders', orderRouter)
app.use('api/checkout', stripeRoute)
app.use(express.json())


app.get("/api/test", () => {
    console.log("test is successful")
})


app.listen(process.env.PORT || 1000, () => {
    console.log("your server is running on port 1000")
})