// claimController.js
claimRep = require('../repository/claimRepository')

CreateClaimRequsetModel = require('../models/api/claim/CreateClaimRequest');
ClaimResponceModel = require('../models/api/claim/GetClaimResponce');

// Handle create claim actions
async function create (req, res) {
    console.log("api createClaim");
    try {
        var claim = req.body;
        await claimRep.createClaim(claim);
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
        console.log("api claim index");
        var claims = await claimRep.getClaims();
        res.json({
            status: "success",
            message: "Claims retrieved successfully",
            data: claims
        });
    }
    catch (e) {
        console.log(e);
        res.json(e);
    }
};

async function view (req, res) {
    try {
        console.log("api claim view");
        var claimId = req.params.claim_id
        var claim = await claimRep.findClaimById(claimId);
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
