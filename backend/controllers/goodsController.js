// goodsController.js
// Import contact mode

db = require('../repository/repository');

CreateGoodsRequsetModel = require('../models/api/goods/CreateGoodsRequest');
GoodsResponceModel = require('../models/api/goods/GetGoodsResponce');

async function index (req, res) {
    try {
        console.log("index");
        //var users = await db.getUsers();
        res.json({
            status: "success",
            message: "Goods retrieved successfully",
            data: [new GoodsResponceModel(), new GoodsResponceModel()]
        });
    }
    catch (e) {
        console.log(e);
        res.json(e);
    }
};

// Handle view goods info
async function view (req, res) {
    try {
        console.log("index");
        //var users = await db.getUsers();
        res.json({
            status: "success",
            message: "Goods details successfully",
            data: new GoodsResponceModel()
        });
    }
    catch (e) {
        console.log(e);
        res.json(e);
    }
};

async function create (req, res) {
    

    var goods = req.body;
    // save the claim and check for errors
    try {
        //var claimId = await db.createUser(contact);
        //claimId.createrId = userId;

        res.json({
                message: 'New goods created!',
                data: goods
        });
    }
    catch (e) {
        res.json(e);
    }
};

module.exports = {
    index: index,
    view: view,
    create: create,
};
