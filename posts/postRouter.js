const express = require("express");
const router = express.Router();
const postData = require("./postDb");

router.get("/", (req, res) => {
    postData
    .get(req)
    .then((response) => {
      res.status(200).json({ data: response });
    })
    .catch((err) => {
      res.status(500).json({ error: `Process Failed: ${err}` });
    });
});

router.get("/:id", (req, res) => {
 postData
    .getById(req.params.id)
    .then((response) => {
      res.status(200).json({ data: response });
    })
    .catch((err) => {
      res.status(500).json({ error : "No post with this ID found" });
});

router.delete("/:id", (req, res) => {
  postData.remove(req.params.id)
  .then((res2) => {
    if(res2) {
      res.status(200).json({ message: "Post removed!" });
    } else {
      res.status(404).json({ error: "Post can not be found" });
    }
  })
  .catch((err) => {
    res.status(500).json({ error: "Unable to find message" });
  })
});

router.put("/:id", (req, res) => {
  const changes = req.body
  console.log(req.body)
  postData
    .update(req.params.id, changes)
    .then((post) => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({ error: "Unable to find post" });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: "Unable to find post" });
    });
});

// custom middleware

function validatePostId(req, res, next) {
}
});
module.exports = router;
