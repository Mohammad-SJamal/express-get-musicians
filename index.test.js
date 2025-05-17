// install dependencies
const { execSync } = require('child_process');
execSync('npm install');
execSync('npm run seed');

const request = require("supertest")
const { db } = require('./db/connection');
const { Musician } = require('./models/index')
const app = require('./src/app');
const {seedMusician} = require("./seedData");


describe('./musicians endpoint', () => {
    // Write your tests here
    test("Testing musicians endpoint", async () => {
        const response = await request(app).get("/musicians");
        expect(response.statusCode).toBe(200);
        const mscns = await Musician.findAll();
        expect(mscns.length).toEqual(JSON.parse(response.text).length);
    })

    test("Testing musicians parameters endpoint", async () => {
        const response = await request(app).get("/musicians/1");
        expect(response.statusCode).toBe(200);
        const mscn = await Musician.findByPk(1);
        expect(mscn.name).toBe(JSON.parse(response.text).name);
    })

    test("Testing if can add new musicians", async () => {
        const response = await request(app).post("/musicians/add/john/triangle");
        expect(response.statusCode).toBe(200);
        expect((await Musician.findOne({ where : {
            name: "john"
        }})).name).toBe(JSON.parse(response.text).name);
    })

    test("Testing if post can change an entry", async () => {
        const response = await request(app).post("/musicians/1/marcel/guitar");
        expect(response.statusCode).toBe(200);
        expect((await Musician.findByPk(1)).name).toBe("marcel");
    })

    test("Testing if can delete something from database", async () => {
        const response = await request(app).post("/musicians/delete/3");
        expect(response.statusCode).toBe(200);
        expect(await Musician.findByPk(3)).toBe(null);
    })
    
    




    
})
