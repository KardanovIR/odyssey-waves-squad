// goodsController.js
// Import contact mode

routeRep = require('../repository/routeRepository');

CreateRouteRequestModel = require('../models/api/route/CreateRouteRequest');

async function index (req, res) {
    try {
        console.log("index");
        var routes = await routeRep.getTransportRoute();
        res.json({
            status: "success",
            message: "Routes retrieved successfully",
            data: routes
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
        console.log("view goods");
        var routeId = req.params.route_id
        var goods = await routeRep.findTransportRouteById(routeId);
        res.json({
            status: "success",
            message: "Goods details successfully",
            data: goods
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
         await routeRep.createTransportRoute(goods);
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
