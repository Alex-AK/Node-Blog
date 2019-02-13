const express = require('express');
const router = express.Router();

const db = require('./postDb');
const usersDb = require('../Users/user-router');

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

// get posts by user
router.get('/user/:id', (req, res) => {
  const user_id = req.params.id;
  console.log(user_id);

  usersDb
    .getUserPosts(user_id)
    .then(posts => {
      if (!posts) {
        res.status(404).json({
          success: false,
          message:
            'The post you are looking for does not exist, please try another id'
        });
      } else {
        res.status(200).json({ success: true, posts });
      }
    })
    .catch(err =>
      res.status(500).json({
        success: false,
        message: 'An error occurred while retrieving the posts'
      })
    );
});

// create a new post, requires text field and user id
router.post('/', (req, res) => {
  const { text, user_id } = req.body;
  const newPost = req.body;

  console.log(text);
  console.log(newPost);

  if (!text || !user_id) {
    res.status(400).json({
      success: false,
      message: 'Unable to create a new post, missing a required input'
    });
  }

  db.insert(newPost)
    .then(post => {
      res.status(201).json({ success: true, post });
    })
    .catch(err =>
      res.status(500).json({
        success: false,
        message: 'An error occurred while creating the post'
      })
    );
});

router.delete('/', (req, res) => {});

router.put('/', (req, res) => {});

module.exports = router;
