const express = require('express');
const apiRouter = express.Router();
const {createMeeting,
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
    deleteAllFromDatabase} = require('./db'); 
    const {checkMillionDollarIdea} = require('./checkMillionDollarIdea');

//router for minions
apiRouter.param('minionId', (req, res, next, id) => {
    let minionId = id;
    let minion = getFromDatabaseById('minions', minionId);
    if (minion) {
        req.minion = minion;
        next();
    } else {
        res.status(404).send(`Minion not found`);
    }
})
apiRouter
    .get('/minions', (req, res) => {
        res.send(getAllFromDatabase('minions'));
    })
    .post('/minions', (req, res) => {
        let newMinion = {
            name: req.body.name,
            title: req.body.title,
            weaknesses: req.body.weaknesses,
            salary: Number(req.body.salary)
        }
        addToDatabase('minions', newMinion);
        res.send(newMinion);
    });

apiRouter
    .get('/minions/:minionId', (req, res) => {
        let minionId = req.minion.id;
        res.send(getFromDatabaseById('minions', minionId));
    })
    .put('/minions/:minionId', (req, res) => {
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
    .delete('/minions/:minionId', (req, res) => {
        let minionId = req.minion.id;
        deleteFromDatabasebyId('minions', minionId);
        res.status(202).send(`minion deleted`);
    });


//router for ideas

apiRouter.param('ideaId', (req, res, next, id) => {
    let ideaId = id;
    let idea = getFromDatabaseById('ideas', ideaId);
    if (idea) {
        req.idea = idea;
        next();
    } else {
        res.status(404).send(`Idea not found`);
    }
});


apiRouter
    .get('/ideas', (req, res) => {
        res.send(getAllFromDatabase('ideas'));
    })
    .post('/ideas', (req, res) => {
        let newIdea = {
            name: req.body.name,
            description: req.body.description,
            numWeeks: Number(req.body.numWeeks),
            weeklyRevenue: Number(req.body.weeklyRevenue)
        }
        addToDatabase('ideas', newIdea);
        res.send(newIdea);
    });

apiRouter
    .get('/ideas/:ideaId', (req, res) => {
        let ideaId = req.idea.id;
        res.send(getFromDatabaseById('ideas', ideaId));
    })
    .put('/ideas/:ideaId', (req, res) => {
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
    .delete('/ideas/:ideaId', (req, res) => {
        let ideaId = req.idea.id;
        deleteFromDatabasebyId('ideas', ideaId);
        res.status(202).send(`idea deleted`);
    });

//router for meetings
apiRouter
    .get('/meetings', (req, res) => {
        res.send(getAllFromDatabase('meetings'));
    })
    .post('/meetings', (req, res) => {
        let newMeeting = {
            time: req.body.time,
            date: new Date(req.body.date),
            day: req.body.day,
            note: req.body.note
        }
        addToDatabase('meetings', newMeeting);
        res.send(newMeeting);
    })
    .delete('/meetings', (req, res) => {
      deleteAllFromDatabase('meetings'); 
      res.status(204).send(`All meetings have been cleared`);

    });

module.exports = apiRouter;
