const { Musician, Band } = require("./models/index")
const { db } = require("./db/connection");
const { seedMusician, seedBand } = require("./seedData");

const syncSeed = async () => {
    await db.sync({force: true});
    seedMusician.map(musician => Musician.create(musician));
    seedBand.map(band => Band.create(band));
    let band1 = await Band.findByPk(1);
    await band1.addMusician(1);
    band1 = await Band.findByPk(2);
    await band1.addMusician(2);
    band1 = await Band.findByPk(3);
    await band1.addMusician(3);
}

syncSeed();