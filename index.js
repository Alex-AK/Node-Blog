// code away!
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const postsRouter = require('./Posts/post-router');

const server = express();

server.use(express.json());
server.use(helmet());
server.use(morgan('dev'));

// connect server with user routes
server.use('/posts', postsRouter);
// connect server with post routes

// middleware goes here

// create middleware to uppercase incoming name before doing a put or post request

server.get('/', (req, res) => {
  res.status(200).json({ success: true });
});

server.listen(5000, () => {
  console.log('* Server Running on Port 5000 *');
});
