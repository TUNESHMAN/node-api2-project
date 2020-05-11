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

// I wrote my dummy endpoint
server.get("/", (req, res) => {
  res.json("Hello from server");
});

server.get("/api/posts", (req,res)=>{
    // Get all posts, no extra info such as id is needed


})

server.get("/api/posts/:id", (req,res)=>{
    // Get a post by its id
})


server.delete("/api/posts/:id", (req,res)=>{
// Delete a post by id
})

server.put("/api/posts/:id", (req,res)=>{
    // Update a post by id
})


// Listen on the port
server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
