tvmClient = require('../services/tvmClient')

BillLanding = require('../models/tvm/BillLandingModel');

async function calculatePremium (req, res) {
    try {
        
    console.log("api tvm calculatePremium");
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
