import dotenv from "dotenv"
dotenv.config()
import app from "./server.js"
import mongodb from "mongodb"
import ReviewsDAO from "./dao/reviewsDAO.js" // Data Access Objects
import path from "path"
import express from "express"
import { fileURLToPath } from "url"


const MongoClient = mongodb.MongoClient

let connectionString;

if(process.env.CLUSTER_ON_CLOUD){
    connectionString = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_DOMAIN}/`
}
else{
    connectionString = `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_DOMAIN}/reviews`
    // const connectionString = 'mongodb://username:password@host1:27017,host2:27017,host3:27017/myDatabase?replicaSet=myReplicaSet';
}

const port = process.env.PORT ||
27017;
const _filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(_filename)

app.use(express.static((__dirname)))
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"))
})

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
