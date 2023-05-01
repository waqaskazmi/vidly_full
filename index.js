const winston = require('winston');
const express = require('express');
const path = require('path');

const app = express();

require('./startup/logging')();
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();
require('./startup/validation')();
require('./startup/prod')(app);

console/log("abc");
app.get("/", (req, res) => {
    app.use(express.static(path.resolve(__dirname,"client","build")));
    res.sendFile(path.resolve(__dirname,"client","build","index.html"));
  });

const port = process.env.PORT || 4000;
app.listen(port, () => winston.info(`listening on port ${port} ....`));

