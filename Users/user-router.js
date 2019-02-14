const express = require('express');
const router = express.Router();

const users = require('../Users/userDb');

// incoming '/user' from the server

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

// create a new user, requires name field
router.post('/', capitalizeName, (req, res) => {
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

// delete user posts and user
router.delete('/:id', (req, res) => {
  const user_id = req.params.id;

  users
    .removeUserPosts(user_id)
    .then(() => {
      users.remove(user_id).then(result => {
        if (result) {
          res
            .status(200)
            .json({ success: true, message: 'User successfully deleted' });
        } else {
          res.status(404).json({ success: false, message: 'User not found' });
        }
      });
    })
    .catch(err =>
      res
        .status(500)
        .json({ message: 'Something went wrong while deleting user and posts' })
    );
});

// update user by user id
router.put('/:id', capitalizeName, (req, res) => {
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
    .then(user => {
      if (!user) {
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

function capitalizeName(req, res, next) {
  let { name } = req.body;
  req.body.name = name
    .toLowerCase()
    .split(' ')
    .map(name => name.charAt(0).toUpperCase() + name.substring(1))
    .join(' ');
  next();
}

module.exports = router;
