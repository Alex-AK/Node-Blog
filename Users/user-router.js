const express = require('express');
const router = express.Router();

const users = require('../Users/userDb');

// incoming '/users' from the server

// get all users
router.get('/', (req, res) => {
  users
    .get()
    .then(users => res.status(200).json({ success: true, users }))
    .catch(err =>
      res.status(500).json({
        success: false,
        message: 'An error occurred while retrieving the users'
      })
    );
});

// get user by id, receiving id from param
router.get('/:id', (req, res) => {
  const id = req.params.id;

  users
    .getById(id)
    .then(user => {
      if (!user) {
        res.status(404).json({
          success: false,
          message:
            'The user you are looking for does not exist, please try another id'
        });
      } else {
        res.status(200).json({ success: true, user });
      }
    })
    .catch(err =>
      res.status(500).json({
        success: false,
        message: 'An error occurred while retrieving the users'
      })
    );
});

// get user posts
router.get('/:id/posts', (req, res) => {
  const user_id = req.params.id;
  console.log(user_id);

  users
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
  const { name } = req.body;
  const newUser = req.body;

  if (!name) {
    res.status(400).json({
      success: false,
      message: 'Unable to create a new user, missing a required input'
    });
  }

  users
    .insert(newUser)
    .then(user => {
      res.status(201).json({ success: true, user });
    })
    .catch(err =>
      res.status(500).json({
        success: false,
        message: 'An error occurred while creating the user'
      })
    );
});

router.delete('/:id', (req, res) => {
  const id = req.params.id;

  users
    .remove(id)
    .then(post => {
      if (!post) {
        res.status(404).json({
          success: false,
          message: 'Unable to find a post with specified id.'
        });
      } else {
        res.status(200).json({
          success: true,
          message: `Deleted post with the id of ${id}`
        });
      }
    })
    .catch(err =>
      res.status(500).json({
        success: false,
        message: 'An error occurred while deleting the post'
      })
    );
});

// update post by user id
router.put('/:id', (req, res) => {
  const id = req.params.id;
  const incomingUpdate = req.body;
  const updated = { ...req.body, id: req.params.id };
  const { name } = req.body;

  if (!name) {
    res.status(400).json({
      success: false,
      message: 'Unable to update the user, missing a required input'
    });
  }
  users
    .update(id, incomingUpdate)
    .then(post => {
      if (!post) {
        res.status(404).json({
          success: false,
          message: 'Unable to find a user with specified id.'
        });
      } else {
        res.status(200).json({ success: true, updated });
      }
    })
    .catch(err =>
      res.status(500).json({
        success: false,
        message: 'An error occurred while updating the user'
      })
    );
});

module.exports = router;
