const express = require("express");
const app = express();
const { Musician } = require("../models/index")
const { db } = require("../db/connection")

const port = 3000;

//TODO: Create a GET /musicians route to return all musicians 

app.get("/musicians", async (req, res) => {
    res.json(await Musician.findAll());
})

app.get("/musicians/:id", async (req, res) => {
    let id = parseInt(req.params.id);
    res.json(await Musician.findByPk(id));
})

app.use(express.json());
app.use(express.urlencoded());

app.post("/musicians/add/:name/:instrument", async (req, res) => {
    await Musician.create({
        name: req.params.name,
        instrument: req.params.instrument
    });
    res.json(await Musician.findOne({ where: { name: req.params.name } }));
})

app.put("/musicians/:id/:name/:instrument", async (req, res) => {
    let musc = await Musician.findByPk(req.params.id);
    await musc.update({
        name: req.params.name,
        instrument: req.params.instrument
    })
    res.send(musc)
})

app.delete("/musicians/delete/:id", async (req, res) => {
    let musc = await Musician.findByPk(req.params.id);
    let response = await musc.destroy();
    res.send(response);
})




module.exports = app;