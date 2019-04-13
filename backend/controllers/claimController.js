// claimController.js
// Import contact mode

db = require('../repository/repository')

CreateClaimRequsetModel = require('../models/api/claim/CreateClaimRequest');
ClaimResponceModel = require('../models/api/claim/CreateClaimRequest');

// Handle create claim actions
async function create (req, res) {
    var claim = new CreateClaimRequsetModel();

    // save the claim and check for errors
    try {
        //var claimId = await db.createUser(contact);
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
        //var users = await db.getUsers();
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
        console.log("index");
        //var users = await db.getUsers();
        res.json({
            status: "success",
            message: "Claim details successfully",
            data: new ClaimResponceModel()
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
