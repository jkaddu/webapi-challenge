const express = require('express');


const server = express();

server.use(express.json());

const projectsRouter = require('./routes/projectsRouter.js');
const actionsRouter = require('./routes/actionsRouter.js');

server.use('/api/projects', projectsRouter);
server.use('/api/actions', actionsRouter);

server.get('/', (req, res) => {
    res.send(`
    <h2>Lambda Backend Challenge I<h2>
    `)
})

module.exports = server;