const express = require('express');

const checkMillionDollarIdea = (req, res, next) => {
    let numWeeks = req.body.numWeeks;
    let weeklyRevenue = req.body.weeklyRevenue;
    if(!numWeeks || !weeklyRevenue ) {
        res.status(400).send(`Give me the number of weeks and weekly revenue so I can compute the total value `); 
    } else {
        let totalValue = numWeeks * weeklyRevenue; 
        totalValue >= 1000000 ? next() :  res.status(400).send(`Idea not profitable`); 
    }
};

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
