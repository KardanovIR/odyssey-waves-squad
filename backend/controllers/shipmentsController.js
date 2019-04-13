// shipmentController.js
shipmentsRep = require('../repository/shipmentRepository')

CreateShipmentModel = require('../models/api/shipment/CreateShipmentRequest');
GetShipmentModel = require('../models/api/shipment/GetShipmentResponce');

// Handle create claim actions
async function create (req, res) {
    try {
        //var claimId = await db.createUser(contact);
        //claimId.createrId = userId;
        var shipment = req.body;
        await shipmentsRep.createShipment(shipment);
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
        var shipments = await shipmentsRep.getShipments();
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

async function allRecived (req,res) {
    try {
        console.log("index");
        var userId = req.params.user_id
        var shipments = await shipmentsRep.getShipmentsByReciverId(userId);
        res.json({
            status: "success",
            message: "Recived Shipments retrieved successfully",
            data: shipments
        });
    }
    catch (e) {
        console.log(e);
        res.json(e);
    }
}

async function allSend (req,res) {
    try {
        console.log("index");
        var userId = req.params.user_id
        var shipments = await shipmentsRep.getShipmentsBySenderId(userId);
        res.json({
            status: "success",
            message: "Send Shipments retrieved successfully",
            data: shipments
        });
    }
    catch (e) {
        console.log(e);
        res.json(e);
    }
}

async function allCarier (req,res) {
    try {
        console.log("index");
        var userId = req.params.user_id
        var shipments = await shipmentsRep.getShipmentsByCarierId(userId);
        res.json({
            status: "success",
            message: "Carier Shipments retrieved successfully",
            data: shipments
        });
    }
    catch (e) {
        console.log(e);
        res.json(e);
    }
}

async function view (req, res) {
    try {
        console.log("view");
        var shipmentId = req.params.shipment_id
        var shipment = await shipmentsRep.findShipmentById(shipmentId);
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
    view: view,
    allRecived: allRecived,
    allCarier: allCarier,
    allSend: allSend
};
