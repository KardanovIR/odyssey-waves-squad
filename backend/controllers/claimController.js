// claimController.js
db = require('../repository/repository')

CreateClaimRequsetModel = require('../models/api/claim/CreateClaimRequest');
ClaimResponceModel = require('../models/api/claim/GetClaimResponce');

// Handle create claim actions
async function create (req, res) {
    console.log("api createClaim");
    
    // save the claim and check for errors
    try {
        var claim = req.body;
        console.log(claim);
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
        var claims = await db.getClaims();
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
