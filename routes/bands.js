const express = require("express");
const { Musician, Band } = require("../models/index")

const bandRouter = express.Router();

bandRouter.get("/", async (req, res) => {
    res.json(await Band.findAll({ include: Musician }));
})

bandRouter.get("/:id", async (req, res) => {
    res.json(await Band.findByPk(req.params.id, { include: Musician }));
})


module.exports = bandRouter;