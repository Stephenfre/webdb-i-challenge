const express = require('express');

const db = require('../data/dbConfig.js');

const router = express.Router();


router.get('/', (req, res) => {
    db('accounts').select('*')
        .then(account => {
            res.status(200).json(account)
        })
        .catch(err => {
            res.status(500).json({ message: 'problem with the database', err })
        })
});

// router.get('/:id', (req, res) => {
//     const { id } = req.params;
//     db('accounts').select('*').where({ id }
//         .then(account) => {
//             if
//         })
// })


router.post('/', (req, res) => {
    const accountData = req.body;

    db('accounts').insert(accountData)
        .then(acoount => {
            res.status(201).json(acoount)
        })
        .catch(err => {
            res.status(500).json({ message: 'db problem', err })
        })
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;

    db('accounts').where({ id }).update(changes)
        .then(count => {
            if (count) {
                res.status(200).json({ updated: count })
            } else {
                res.status(404).json({ message: 'invalid id' })
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'db problem' })
        })
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;

    db('accounts')
        .where({ id })
        .del()
        .then(count => {
            count
                ? res.status(200).json({ deleted: count })
                : res.status(404).json({ message: 'invalid ID' })
        })
        .catch(err => {
            res.status(500).json({ message: 'db problem', err })
        })
});


module.exports = router;