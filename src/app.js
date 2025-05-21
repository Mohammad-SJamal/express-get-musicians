const express = require("express");
const app = express();
const { Musician } = require("../models/index")
const { db } = require("../db/connection")

const port = 3000;

const musiciansRouter = require("./../routes/musicians");

//TODO: Create a GET /musicians route to return all musicians 

app.use("/musicians", musiciansRouter);


module.exports = app;