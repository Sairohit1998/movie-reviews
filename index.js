import dotenv from "dotenv"
dotenv.config()
import app from "./server.js"
import mongodb from "mongodb"
import ReviewsDAO from "./dao/reviewsDAO.js" // Data Access Objects

const MongoClient = mongodb.MongoClient
// const mongoose = require("mongoose")
// const dotenv = require("dotenv")

// https://www.coderrocketfuel.com/article/store-mongodb-credentials-as-environment-variables-in-nodejs
// mongodb+srv://darshil_05:<password>@clusterd.km0y9bk.mongodb.net/
console.log(process.env.MONGO_USERNAME)
const connectionString = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@clusterd.km0y9bk.mongodb.net/`
const port = 8000

// mongoose.connect(connectionString, {
// 	useNewUrlParser: true,
// 	useUnifiedTopology: true,
// });

// const db = mongoose.connection;
// db.on("error", console.error.bind(console, "connection error"));
// db.once("open", () => {
// 	console.log("database connected");
// });

MongoClient.connect(
    connectionString,
    {
        maxPoolSize: 50, //at a time 50 users can connect to the application
        wtimeoutMS: 500, // will try to connect till 5s and if it doesn't connect it will timeout
        // useNewUrlParser: true,
        // useUnifiedTopology: true
    })
    .catch(err => {
        console.error(err.stack)
        process.exit(1)
    })
    .then(async client => {
        await ReviewsDAO.injectDB(client)
        app.listen(port, () => {
            console.log(`listening on port ${port}`)
        })
    })

// mongoose.connect(connectionString);
