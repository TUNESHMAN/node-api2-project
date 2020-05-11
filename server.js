const express = require("express");

const port = 5000;

const server = express();

server.get("/", (req, res) => {
  res.send("Hello from server");
});

server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
