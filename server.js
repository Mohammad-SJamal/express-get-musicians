const app = require("./src/app");
const { execSync } = require('child_process');

const { db } = require("./db/connection")
execSync('npm run seed');

const port = 3000;

app.listen(port, () => {
    db.sync();
    console.log(`Listening at http://localhost:${port}/musicians`)
})