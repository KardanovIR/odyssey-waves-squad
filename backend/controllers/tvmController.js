// contactController.js
tvmClient = require('../services/tvmClient')
// Import contact model
BillLanding = require('../models/tvm/BillLandingModel');

// Handle index actions
async function calculatePremium (req, res) {
    try {
        console.log("calculate");
        var responce = await tvmClient.calculatePremium(req.body);
        res.json({
            status: "success",
            message: "calculated",
            data: responce
        });
    }
    catch (e) {
        console.log(e);
        res.json(e);
    }
};

module.exports = {
    calculatePremium: calculatePremium,
};
