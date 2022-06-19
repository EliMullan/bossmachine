const express = require('express');
const meetingRouter = express.Router();
const {
    getAllFromDatabase,
    addToDatabase,   
    deleteAllFromDatabase} = require('./db'); 
const bodyparser = require('body-parser');
meetingRouter.use(bodyparser.json());

//router for meetings
meetingRouter
    .get('/', (req, res) => {
        res.send(getAllFromDatabase('meetings'));
    })
    .post('/', (req, res) => {
        let newMeeting = {
            time: String(req.body.time),
            date: new Date(req.body.date),
            day: String(req.body.day),
            note: String(req.body.note)
        }
        addToDatabase('meetings', newMeeting);
        res.status(201).send(newMeeting);
    })
    .delete('/', (req, res) => {
      deleteAllFromDatabase('meetings'); 
      res.status(204).send(`All meetings have been cleared`);

    });

    module.exports = meetingRouter;
