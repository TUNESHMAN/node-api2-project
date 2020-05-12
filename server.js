// These are the imports
const express = require("express");
const cors = require("cors");
const {
  find,
  findById,
  insert,
  update,
  remove,
  findPostComments,
  findCommentById,
  insertComment,
} = require("./data/db");

const port = process.env.PORT || 5000;
// Flesh out a dummy server
const server = express();
// Plug extra functionality to the server
server.use(express.json());

// I enabled CORS so that the server works for all origins
server.use(cors());

// I wrote my dummy endpoint
server.get("/api", (req, res) => {
  res.json("Hello from server");
});

server.get("/api/posts", (req, res) => {
  // Get all posts, no extra info such as id is needed
  find()
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((error) => {
      res.status(500).json({
        message: error.message,
        stack: error.stack,
      });
    });
});

server.get("/api/posts/:id", (req, res) => {
  // Get a post by its id which is a parameter of the path
  const { id } = req.params;
  findById(id)
    .then((posts) => {
      // Two things can happen,
      // ID exists? We res.json the data
      // ID does not exist? We res.json 404
      if (posts) {
        res.status(200).json(posts);
      } else {
        res.status(404).json({ message: "the post could not be found" });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: error.message,
        stack: error.stack,
      });
    });
});

server.delete("/api/posts/:id", (req, res) => {
  // Delete a post by id
  const { id } = req.params;
  remove(id)
    .then((posts) => {
      if (posts) {
        res.status(202).json(`The post is successfully removed`);
      } else {
        res
          .status(404)
          .json({ message: `The post does not exist in the database` });
      }
    })
    .catch((error) => {
      res.status(500).json({ message: error.message, stack: error.stack });
    });
});

server.post("/api/posts", (req, res) => {
  const newPost = req.body;
  if (newPost.title && newPost.contents) {
    insert(newPost)
      .then((posts) => {
        res.status(201).json(posts);
      })
      .catch((error) => {
        res.status(500).json({
          message: error.message,
        });
      });
  } else {
    res
      .status(400)
      .json({ message: `Please provide title and contents for the post.` });
  }
});

server.put("/api/posts/:id", (req, res) => {
  // Update a post by id
  const { id } = req.params;
  const replacementPost = req.body;
  update(id, replacementPost)
    .then((posts) => {
      res.status(205).json(posts);
    })
    .catch((error) => {
      res.status(500).json({
        message: error.message,
      });
    });
});

server.post("/api/posts/:id/comments", (req, res) => {
  const { comments } = req.params;
  const newComment = req.body;
  insertComment(comments, newComment)
    .then((comment) => {
      res.status(201).json(comment);
    })
    .catch((error) => {
      res.status(500).json({
        message: error.message,
      });
    });
});

server.get("/api/posts/:id/comments", (req, res) => {
  const { id, comments } = req.params;
  findPostComments(id, comments)
    .then((comment) => {
      if (comment) {
        res.status(200).json(comment);
      } else {
        res.status(500).json({ message: `post does not exist` });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: `Comment not found`,
      });
    });
});
// Listen on the port
server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
