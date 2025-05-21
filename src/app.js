const express = require("express");
const app = express();
const { Musician } = require("../models/index")
const { db } = require("../db/connection")

const port = 3000;

const musiciansRouter = require("./../routes/musicians");
const bandRouter = require("./../routes/bands");

//TODO: Create a GET /musicians route to return all musicians 

app.use("/musicians", musiciansRouter);
app.use("/bands", bandRouter);


module.exports = app;