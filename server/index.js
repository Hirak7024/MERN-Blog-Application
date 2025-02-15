const express = require("express");
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')
const authRoute = require('./routes/auth')
const userRoute = require('./routes/users')
const postRoute = require('./routes/posts')
const commentRoute = require('./routes/comments')

//database
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("database is connected successfully!")

    }
    catch (err) {
        console.log(err)
    }
}



//middlewares
dotenv.config()
app.use(express.json())
app.use(cors())
app.use("/api/auth", authRoute)
app.use("/api/users", userRoute)
app.use("/api/posts", postRoute)
app.use("/api/comments", commentRoute)

app.get("/", (req, res) => {
    res.send("Hi this is the server for Blog Application");
})

app.listen(process.env.PORT, async () => {
    await connectDB()
    console.log("app is running on port " + process.env.PORT)
})