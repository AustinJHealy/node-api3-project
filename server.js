const express = require('express');
const server = express();
const logger = require("./middleware/logger");
const postRouter = require("./posts/postRouter");
const userRouter = require("./users/userRouter");

server.use(express.json());
server.use(logger("long"));
server.use("/posts", postRouter);
server.use("/users", userRouter);

server.get('/', (req, res) => {
  res.send(`
  <h2>Valid Endpoints</h2>
  `);
});



module.exports = server;
