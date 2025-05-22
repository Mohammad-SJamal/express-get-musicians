const express = require("express");
const { Musician } = require("../models/index")
const { check, validationResult } = require("express-validator");


const musicianRouter = express.Router();

musicianRouter.use(express.json());
musicianRouter.use(express.urlencoded());

musicianRouter.get("/", async (req, res) => {
    res.json(await Musician.findAll());
})

musicianRouter.get("/:id", async (req, res) => {
    let id = parseInt(req.params.id);
    res.json(await Musician.findByPk(id));
})


// musicianRouter.post("/add/:name/:instrument", async (req, res) => {
//     await Musician.create({
//         name: req.params.name,
//         instrument: req.params.instrument
//     });
//     res.json(await Musician.findOne({ where: { name: req.params.name } }));
// })

musicianRouter.post("/", [check("name").not().isEmpty().trim(), check("instrument").not().isEmpty().trim()], async (req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        res.json({errors: errors.array()});
    } else{
        let musc = await Musician.create({
            name: req.body.name,
            instrument: req.body.instrument
        });
        res.json(musc);
    }
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