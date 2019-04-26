const express = require('express');

const db = require('../data/helpers/projectModel');

const router = express.Router(); 

router.get('/', (req, res) => {
    db
    .get()
    .then(projects => {
        res.json(projects)
    })
    .catch(err => {
        res.status(500).json({ error: "Info not retrieved." })
    });
});

router.post('/', (req, res) => {
    const newProject = req.body;

    db
    .insert(newProject)
    .then(projects => {
        res.status(200).json(projects)
    })
    .catch(err => {
        res.status(500).json({ error: "Error posting project." })
    });
});

router.delete('./:id', (req, res) => {
    const {id} = req.params;
    db
    .remove(id)
    .then(deleted => {
        if(deleted) {
            res.status(404).json({ error: "Project ID not found." })
        }
        res.status(200).json.end();
    })
    .catch(err => {
        res.status(500).json({ error: "Project could not be removed." })
    });
});

router.put('/:id', (req, res) => {
    const{id} = req.params;
    const project = req.body;
    db
    .update(id, project)
    .then(project => {
        if(!project) {
            res.status(404).json({ message: "Project with ID was not found." })
        }
        res.status(200).json(project);
    })
    .catch(err => {
        res.status(500).json({ error: "Project info could not be modified"})
    });
});

module.exports = router;