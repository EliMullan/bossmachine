const express = require('express');
const ideaRouter = express.Router();
const {createMeeting,
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
    deleteAllFromDatabase} = require('./db'); 

const checkMillionDollarIdea = require('./checkMillionDollarIdea');
const bodyparser = require('body-parser');
ideaRouter.use(bodyparser.json());

//router for ideas

ideaRouter.param('ideaId', (req, res, next, id) => {
    let ideaId = id;
    let idea = getFromDatabaseById('ideas', ideaId);
    if (idea) {
        req.idea = idea;
        next();
    } else {
        res.status(404).send(`Idea not found`);
    }
});


ideaRouter
    .get('/', (req, res) => {
        res.send(getAllFromDatabase('ideas'));
    })
    .post('/', checkMillionDollarIdea, (req, res) => {
        let newIdea = {
            name: req.body.name,
            description: req.body.description,
            numWeeks: Number(req.body.numWeeks),
            weeklyRevenue: Number(req.body.weeklyRevenue)
        }
        addToDatabase('ideas', newIdea);
        res.status(201).send(newIdea);
    });

ideaRouter
    .get('/:ideaId', (req, res) => {
        let ideaId = req.idea.id;
        res.send(getFromDatabaseById('ideas', ideaId));
    })
    .put('/:ideaId', (req, res) => {
        let updatedIdeaId = req.idea.id;
        let updatedIdea = {
          id:updatedIdeaId,
          name: req.body.name,
          description: req.body.description,
          numWeeks: Number(req.body.numWeeks),
          weeklyRevenue: Number(req.body.weeklyRevenue)
        }
        updateInstanceInDatabase('ideas', updatedIdea );
        res.send(updatedIdea);
    })
    .delete('/:ideaId', (req, res) => {
        let ideaId = req.idea.id;
        deleteFromDatabasebyId('ideas', ideaId);
        res.status(204).send(`idea deleted`);
    });

module.exports = ideaRouter;
