const express = require('express');
const server = express();
const logger = require("./middleware/logger")

server.use(express.json());
//custom middleware
server.use(logger("long"))


server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});



module.exports = server;
