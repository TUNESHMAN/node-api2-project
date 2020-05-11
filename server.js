// These are the imports
const express = require("express");
const cors = require("cors");

const port = 5000;
// Flesh out a dummy server
const server = express();
// Plug extra functionality to the server
server.use(express.json());

// I enabled CORS so that the server works for all origins
server.use(cors());

server.get("/", (req, res) => {
  res.send("Hello from server");
});

server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
