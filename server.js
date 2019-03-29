const express = require('express');
const cors = require('cors')
const helmet = require('helmet');
const morgan = require('morgan');
const actions = require('./routes/actions');
const projects = require('./routes/projects');
// const {nameChecker} = require('./middleware/middleware');

const server = express();


server.use(express.json())
server.use(helmet())
server.use(morgan('dev'))
server.use(cors())

server.use('/api/projects', projects);

server.use('/api/actions', actions);



server.get('/', (req, res, next) => {
    res.send(`
        <h2> test </h2>
    `)
});

module.exports = server;