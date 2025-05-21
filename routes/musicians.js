const express = require("express");
const { Musician } = require("../models/index")


const musicianRouter = express.Router();



musicianRouter.get("/", async (req, res) => {
    res.json(await Musician.findAll());
})

musicianRouter.get("/:id", async (req, res) => {
    let id = parseInt(req.params.id);
    res.json(await Musician.findByPk(id));
})


musicianRouter.post("/add/:name/:instrument", async (req, res) => {
    await Musician.create({
        name: req.params.name,
        instrument: req.params.instrument
    });
    res.json(await Musician.findOne({ where: { name: req.params.name } }));
})

musicianRouter.put("/:id/:name/:instrument", async (req, res) => {
    let musc = await Musician.findByPk(req.params.id);
    await musc.update({
        name: req.params.name,
        instrument: req.params.instrument
    })
    res.send(musc)
})

musicianRouter.delete("/delete/:id", async (req, res) => {
    let musc = await Musician.findByPk(req.params.id);
    let response = await musc.destroy();
    res.send(response);
})

module.exports = musicianRouter;