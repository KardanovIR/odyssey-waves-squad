// shipmentController.js
db = require('../repository/repository')

CreateShipmentModel = require('../models/api/shipment/CreateShipmentRequest');
GetShipmentModel = require('../models/api/shipment/GetShipmentResponce');

// Handle create claim actions
async function create (req, res) {
    try {
        //var claimId = await db.createUser(contact);
        //claimId.createrId = userId;
        var shipment = req.body;
        await db.createShipment(shipment);
        res.json({
                message: 'New shipment created!',
                data: shipment
        });
    }
    catch (e) {
        res.json(e);
    }
};

async function index (req, res) {
    try {
        console.log("index");
        var shipments = await db.getShipments();
        res.json({
            status: "success",
            message: "Shipments retrieved successfully",
            data: shipments
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
        var shipmentId = req.params.shipment_id
        var shipment = await db.findShipmentById(shipmentId);
        res.json({
            status: "success",
            message: "Shipment details successfully",
            data: shipment
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
