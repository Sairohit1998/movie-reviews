import dotenv from "dotenv"
dotenv.config()
// import app from "./server.js"
import mongodb from "mongodb"
import ReviewsDAO from "./dao/reviewsDAO.js" // Data Access Objects

import express from "express"
import cors from "cors"
//CORS or Cross-Origin Resource Sharing in Node.js is a mechanism by which a front-end client can make requests for resources to an external back-end server. The single-origin policy does not allow cross-origin requests and CORS headers are required to bypass this feature

import path from "path";
import reviews from "./api/reviews.route.js"

const app = express();
const __dirname = path.dirname(new URL(import.meta.url).pathname); // Obtain the directory name
app.use(express.static(path.join(__dirname, 'movie-reviews')));
app.use(cors());
app.use(express.json());

app.use("/api/v1/reviews", reviews);
app.use("*", (req, res) => 
    res.status(404).json({error: "not found"}));

const MongoClient = mongodb.MongoClient

const connectionString = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_DOMAIN}/`
const port = process.env.PORT

MongoClient.connect(
    connectionString,
    {
        maxPoolSize: 50, //at a time 50 users can connect to the application
        wtimeoutMS: 500, // will try to connect till 5s and if it doesn't connect it will timeout
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