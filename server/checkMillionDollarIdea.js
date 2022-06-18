const checkMillionDollarIdea = (numWeeks, weeklyRevenue) => {
    let totalValue = numWeeks * weeklyRevenue; 
    return totalValue;
};

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
