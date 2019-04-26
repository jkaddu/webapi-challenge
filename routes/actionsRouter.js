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
        if(deleted) {
            res.status(404).json({ error: 'Actions ID not found' })
        }
        res.status(200).json.end();
    })
    .catch(err => {
        res.status(500).json({ error: 'Action could not be removed.' })
    })
})

module.exports = router;