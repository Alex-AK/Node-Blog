// code away!
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');

const server = express();

server.use(express.json());
server.use(helmet());
server.use(morgan('dev'));

server.get('/', (req, res) => {
  res.status(200).json({ success: true });
});

server.listen(5000, () => {
  console.log('* Server Running on Port 5000 *');
});
