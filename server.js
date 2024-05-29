import express from "express"
import cors from "cors"
//CORS or Cross-Origin Resource Sharing in Node.js is a mechanism by which a front-end client can make requests for resources to an external back-end server. The single-origin policy does not allow cross-origin requests and CORS headers are required to bypass this feature

import reviews from "./api/reviews.route.js"
import dotenv from "dotenv"
dotenv.config()

const app = express();

app.get('/api/apilinks', (req, res) => {
    const APILINK = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${process.env.APIKEY_TMDB}&page=1`;
    const SEARCHAPI = `https://api.themoviedb.org/3/search/movie?&api_key=${process.env.APIKEY_TMDB}&query=`;
    const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
    res.json({ APILINK, SEARCHAPI, IMG_PATH });
});

app.get('/health', (req, res) => {
    res.status(200).send("Health status OK!")
})

app.get('/', (req, res) => {
    res.sendFile(`${process.env.PROJECT_PATH}` + "index.html")
})

app.get('/:static(index.html|style.css|script.js|movie.html|movie.js)', (req, res) => {
    res.sendFile(`${process.env.PROJECT_PATH}` + req.params.static)
})
app.use(cors());
app.use(express.json()); 

app.use("/api/v1/reviews", reviews);
app.use("*", (req, res) => 
    res.status(404).json({error: "not found"}));

export default app