const express = require('express');
const apiRouter = express.Router();
const {createMeeting,
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
    deleteAllFromDatabase} = require('./db'); 

//router for minions
apiRouter
    .get('/minions', (req, res) => {})
    .post('/minions', (req, res) => {});

apiRouter
    .get('/minions/:minionId', (req, res) => {})
    .put('/minions/:minionId', (req, res) => {})
    .delete('/minions/:minionId', (req, res) => {});


//router for ideas
apiRouter
    .get('/ideas', (req, res) => {})
    .post('/ideas', (req, res) => {});

apiRouter
    .get('/ideas/:ideaId', (req, res) => {})
    .put('/ideas/:ideaId', (req, res) => {})
    .delete('/ideas/:ideaId', (req, res) => {});

//router for meetings
apiRouter
    .get('/meetings', (req, res) => {})
    .post('/meetings', (req, res) => {});

module.exports = apiRouter;
