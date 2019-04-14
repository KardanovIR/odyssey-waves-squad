// goodsController.js
routeRep = require('../repository/routeRepository');

CreateRouteRequestModel = require('../models/api/route/CreateRouteRequest');

async function index (req, res) {
    try {
        console.log("api route index");
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

async function view (req, res) {
    try {
        console.log("api reoute view");
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
    console.log("api reoute create");
    var goods = req.body;
    try {
         await routeRep.createTransportRoute(goods);
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
