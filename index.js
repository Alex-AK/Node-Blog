// code away!

require('dotenv').config();

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const postsRouter = require('./Posts/post-router');
const usersRouter = require('./Users/user-router');

const users = require('./Users/userDb');

const server = express();

server.use(express.json());
server.use(helmet());
server.use(morgan('dev'));

server.use('/posts', postsRouter);
server.use('/user', usersRouter);

// get all users
server.get('/users', (req, res) => {
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

server.get('/', (req, res) => {
  res.status(200).json({ success: true });
});

const port = process.env.PORT || 4000;

server.listen(port, () => {
  console.log(`* Server Running on Port ${port} *`);
});
