import express from "express"
import cors from "cors"

// const express = require("express");
// const cors = require("cors");
//CORS or Cross-Origin Resource Sharing in Node.js is a mechanism by which a front-end client can make requests for resources to an external back-end server. The single-origin policy does not allow cross-origin requests and CORS headers are required to bypass this feature


import reviews from "./api/reviews.route.js"
// const reviews = require("./api/reviews.route.js");

const app = express();

app.use(cors());
app.use(express.json()); 

app.use("/api/v1/reviews", reviews);
app.use("*", (req, res) => 
    res.status(404).json({error: "not found"}));

export default app