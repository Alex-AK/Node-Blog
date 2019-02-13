const express = require('express');
const router = express.Router();

const db = require('./postDb');

// incoming '/posts' from the server

// get all posts
router.get('/', (req, res) => {
  db.get()
    .then(posts => res.status(200).json({ success: true, posts }))
    .catch(err =>
      res.status(500).json({
        success: false,
        message: 'An error occurred while retrieving the posts'
      })
    );
});

// get posts by id, receiving id from param
router.get('/:id', (req, res) => {
  const id = req.params.id;

  db.getById(id)
    .then(post => {
      if (!post) {
        res.status(404).json({
          success: false,
          message:
            'The post you are looking for does not exist, please try another id'
        });
      } else {
        res.status(200).json({ success: true, post });
      }
    })
    .catch(err =>
      res.status(500).json({
        success: false,
        message: 'An error occurred while retrieving the posts'
      })
    );
});

router.post('/', (req, res) => {});

router.delete('/', (req, res) => {});

router.put('/', (req, res) => {});

module.exports = router;
