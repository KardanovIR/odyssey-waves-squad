// claimController.js
db = require('../repository/claimRepository')

CreateClaimRequsetModel = require('../models/api/claim/CreateClaimRequest');
ClaimResponceModel = require('../models/api/claim/CreateClaimRequest');

// Handle create claim actions
async function create (req, res) {
    var claim = req.body;
    // save the claim and check for errors
    try {
        await db.createClaim(claim);
        //claimId.createrId = userId;
        res.json({
                message: 'New claim created!',
                data: claim
        });
    }
    catch (e) {
        res.json(e);
    }
};

async function index (req, res) {
    try {
        console.log("index");
        var сдфшьы = await db.getCalims();
        res.json({
            status: "success",
            message: "Claims retrieved successfully",
            data: [new ClaimResponceModel(), new ClaimResponceModel()]
        });
    }
    catch (e) {
        console.log(e);
        res.json(e);
    }
};

async function view (req, res) {
    try {
        console.log("view");
        var claimId = req.params.claim_id
        var claim = await db.findClaimByid(claimId);
        res.json({
            status: "success",
            message: "Claim details successfully",
            data: claim
        });
    }
    catch (e) {
        console.log(e);
        res.json(e);
    }
};


module.exports = {
    index: index,
    create: create,
    view: view
};
