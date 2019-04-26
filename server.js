const express = require('express');

const projectsRouter = require('./routes/projectsRouter.js');

const actionsRouter = require('./routes/actionsRouter.js');

const server = express();

server.use(express.json());

server.use('/api/projects', projectsRouter);

server.use('/api/actions', actionsRouter);

server.get('/', (req, res) => {
    res.send(`
    <h2>Lambda Backend Challenge I<h2>
    `)
})