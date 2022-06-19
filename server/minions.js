const express = require('express');
const minionRouter = express.Router();
const {createMeeting,
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
    deleteAllFromDatabase} = require('./db'); 
const bodyparser = require('body-parser');

const workRouter = require('./work');
minionRouter.use('/:minionId/work', workRouter);


//router for minions
minionRouter.param('minionId', (req, res, next, id) => {
    let minionId = id;
    let minion = getFromDatabaseById('minions', minionId);
    if (minion) {
        req.minion = minion;
        next();
    } else {
        res.status(404).send(`Minion not found`);
    }
})
minionRouter
    .get('/', (req, res) => {
        res.send(getAllFromDatabase('minions'));
    })
    .post('/', (req, res) => {
        let newMinion = {
            name: req.body.name,
            title: req.body.title,
            weaknesses: req.body.weaknesses,
            salary: Number(req.body.salary)
        }
        addToDatabase('minions', newMinion);
        res.status(201).send(newMinion);
    });

minionRouter
    .get('/:minionId', (req, res) => {
        let minionId = req.minion.id;
        res.send(getFromDatabaseById('minions', minionId));
    })
    .put('/:minionId', (req, res) => {
       let updatedMinionId = req.minion.id;
       let updatedMinion = {
         id:updatedMinionId,
         name: req.body.name,
         title: req.body.title,
         weaknesses: req.body.weaknesses,
         salary: Number(req.body.salary)
       }
       updateInstanceInDatabase('minions', updatedMinion );
       res.send(updatedMinion);
    })
    .delete('/:minionId', (req, res) => {
        let minionId = req.minion.id;
        deleteFromDatabasebyId('minions', minionId);
        res.status(204).send(`minion deleted`);
    });

module.exports = minionRouter;