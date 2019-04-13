// extraInfoController.js
// Import contact mode

db = require('../repository/repository')

CreateExtraInfoRequsetModel = require('../models/api/extrainfo/CreateExtraInfoResponce');
ExtraInfoResponceModel = require('../models/api/extrainfo/GetExtrainfoResponce');

// Handle create claim actions
async function create (req, res) {
    var extraInfo = req.body;

    // save the extraInfo and check for errors
    try {
        //var claimId = await db.createUser(contact);
        //claimId.createrId = userId;

        res.json({
                message: 'New ExtraInfo created!',
                data: extraInfo
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
            message: "ExtraInfo retrieved successfully",
            data: [new ExtraInfoResponceModel(), new ExtraInfoResponceModel()]
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
            message: "ExtraInfo details successfully",
            data: new ExtraInfoResponceModel()
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
