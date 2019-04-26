const express = require('express');

const db = require('../data/helpers/actionModel.js');

const router = express.Router(); 

router.get('/', (req, res) => {
    db
    .get()
    .then(actions => {
        res.json(actions)
    })
    .catch(err => {
        res.status(500).json({ error: 'Info not retrieved.'})
    });
});


router.post('/', (req, res) => {
    const newAction = req.body;

    db
    .insert(newAction)
    .then(actions => {
        res.status(200).json(actions)
    })
    .catch(err => {
        res.status(500).json({ error: 'Error posting action.' })
    });
});

router.delete('/:id', (req, res) => {
    const {id} = req.params;
    db
    .remove(id)
    .then(deleted => {
        if(deleted === 0) {
            res.status(404).json({ error: 'Actions ID not found' })
        }
        res.status(200).json.end();
    })
    .catch(err => {
        res.status(500).json({ error: 'Action could not be removed.' })
    });
});

router.put('/:id', (req, res) => {
    const{id} = req.params;
    const action = req.body;

    if(!action.description || !action.project_id) {
        res.status(404).json({ message: "Please provide description and notes."})
    }
    db
    .update(id, action)
    .then(action => {
        if(!action) {
            res.status(404).json({ message: "Action with ID was not found." })
        }
        res.status(200).json(action);
    })
    .catch(err => {
        res.status(500).json({ error: "Action info could not be modified"})
    });
});


module.exports = router;