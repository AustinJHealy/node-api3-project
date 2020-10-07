const express = require('express');
const router = express.Router();
const userData = require("./userDb");
const postData = require("../posts/postDb");


function validateUser(req, res, next) {
  if (req.body.name) {
    next();
  } else if (req.body === null) {
    res.status(400).json({ error: "Please provide user data" });
  } else {
    res.status(400).json({ error: "Please provide a name" });
  };
function validateUserId(req, res, next) {
  if (req.params.id) {
    next();
  } else {
    res.status(400).json({ error: "User ID not found" });
  }
};
function validatePost(req, res, next) {
  if (req.body.text && req.body.user_id) {
    next();
  } else if ((req.body === null)) {
    res.status(404).json({ error: "Post data not found" });
  } else {
    res.status(404).json({ error: "Please enter a value" });
  }
};

router.use(express.json());

router.post('/', validateUser, (req, res) => {
 const newUser = req.body;
  userData
    .insert(newUser)
    .then((resp) => {
      res.status(201).json(resp);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Unable to add new user" });
    });
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  let post = req.body;
  postData
    .insert(post)
    .then((res2) => {
      res2.status(201).json(res2);
    })
    .catch((err) => {
      res.status(500).json({ error: `Unable to add post: ${err}` });
    });
});

router.get('/', (req, res) => {
  userData
    .get(req)
    .then((res2) => {
      res.status(200).json({ data: res2 });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Unable to retrieve user list" });
    });
});

router.get('/:id', validateUserId, (req, res) => {
  userData
    .getById(req.params.id)
    .then((res2) => {
      if (res2) {
        res.status(200).json(res2);
      } else {
        res
          .status(404)
          .json({ error: "ID not found" });
      }
    })
    .catch((err) => {
      console.log(err)
      res
        .status(500)
        .json({ error: "Error" });
    });
});

router.get('/:id/posts', validateUserId, (req, res) => {
  userData
    .getUserPosts(req.params.id)
    .then((res2) => {
      if (res2) {
        res.status(200).json(res2);
      } else {
        res.status(404).json({ error: "User posts not found" });
      }
    })
    .catch((err) => {
      res.status(500).json({
        error: "Posts not found for this ID",
      });
    });
});

router.delete('/:id', validateUserId, (req, res) => {
  userData
    .remove(req.params.id)
    .then((user) => {
      if (user) {
        res.status(200).json({ message: "User successfully removed" });
      } else {
        res.status(404).json({ error: "User not found" });
      }
    })
    .catch((err) => {
      console.log(err)
      res
        .status(500)
        .json({ error: "Error deleting user" });
    });
});

router.put('/:id', validateUserId, (req, res) => {

  const editUser = req.body;
  userData.update(req.params.id, editUser)
  .then((res2) => {
    res.status(201).json(res2);
  })
 .catch((err) => {
   console.log(err);
   res
    .status(500)
    .json({error: "Unable to edit user"}) 
});

module.exports = router;
