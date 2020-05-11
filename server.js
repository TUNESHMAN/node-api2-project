// These are the imports
const express = require("express");
const cors = require("cors");

const port = 5000;
// Flesh out a dummy server
const server = express();

server.get("/", (req, res) => {
  res.send("Hello from server");
});

server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
