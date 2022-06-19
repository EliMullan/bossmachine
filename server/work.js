const express = require('express');
const workRouter = express.Router({mergeParams: true});
const {
    getAllFromDatabase,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
    } = require('./db'); 

const bodyparser = require('body-parser');

workRouter.use(bodyparser.json());


workRouter.param('workId', (req, res, next, id) => {
    let workId = id;
    let workIndex = getAllFromDatabase('work').findIndex(obj => obj.id === workId);
    if (workIndex !== -1) {
        req.workIndex = workIndex;
        next();
    } else {
        res.status(404).send('Work not found')
    }
});

workRouter
    .get('/', (req, res) => {
        let minionWork = getAllFromDatabase('work').filter(obj => obj.minionId === req.params.minionId);
        res.send(minionWork);
    })
    .post('/', (req, res) => {
        const newWork = req.body;
        newWork.minionId =  req.params.minionId;
        if (!newWork) {
            res.status(400).send();
        } else {
            addToDatabase('work', newWork);
            res.status(201).send(newWork);
        }
    })
    .put('/:workId', (req, res) => {
        if (req.params.minionId !== req.body.minionId) {
            res.status(400).send();
          } else {
            let updatedWork = updateInstanceInDatabase('work', req.body);
            res.send(updatedWork);
          }
    })
    .delete('/:workId', (req, res) => {        
        deleteFromDatabasebyId('work', req.params.workId);
        res.status(204).send(`Work deleted`)
    })

module.exports = workRouter;
