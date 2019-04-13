// shipmentController.js
shipmentsRep = require('../repository/shipmentRepository');
goodsRep = require('../repository/goodsRepository');
claimRep = require('../repository/claimRepository');
extraInfoRep = require('../repository/extraInfoRepository');
routeRep = require('../repository/routeRepository');
metricRep = require('../repository/metricsRepository');
tvmClient = require('../services/tvmClient');
InsureCargoResponce = require('../models/tvm/InsureCargoResponce');
BillLanding = require('../models/tvm/BillLandingModel');

CreateShipmentModel = require('../models/api/shipment/CreateShipmentRequest');
GetShipmentModel = require('../models/api/shipment/GetShipmentResponce');

async function create(req, res) {
    console.log("api shipment create");
    try {
        var shipment = req.body;
        shipment.createDate = Date.Now;
        var insureCargoResponse = await tvmClient.insureCargo(shipment);
        shipment.policyId = insureCargoResponse.PolicyID;
        var newShipment = await shipmentsRep.createShipment(shipment);
        if(shipment.goods){
            shipment.goods.forEach(async (entry) => {
                entry.shipmentId = newShipment.id
                await goodsRep.create(entry);
            });
        }

        res.json({
            message: 'New shipment created!',
            data: shipment
        });
    }
    catch (e) {
        console.log(e);
        res.json(e);
    }
};

async function index(req, res) {
    try {
        console.log("api shipment index");
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

async function allRecived(req, res) {
    try {
        console.log("api shipment allRecived");
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

async function allSend(req, res) {
    try {
        console.log("api shipment allSend");
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

async function allCarier(req, res) {
    try {

        console.log("api shipment allCarier");
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

async function view(req, res) {
    try {

        console.log("api shipment view");
        var shipmentId = req.params.shipment_id
        let shipment = await shipmentsRep.findById(shipmentId);
        shipment.goods = await goodsRep.findByShipmentId(shipmentId);
        shipment.claims = await claimRep.findByShipmentId(shipmentId);
        shipment.extraInfo = await extraInfoRep.findByShipmentId(shipmentId);
        shipment.transportRoute = await routeRep.findByShipmentId(shipmentId);
        shipment.metricData = await metricRep.findByDeviceId(shipment.device);
        res.json({
            status: "success",
            message: "Shipment details successfully1",
            data: shipment
        });
    }
    catch (e) {
        console.log(e);
        res.json(e);
    }
};

async function transfer(req, res) {
    try {

        console.log("api shipment transfer");
        var transfer = req.body
        var shipment = await shipmentsRep.findById(transfer.shipmentId);
        shipment.countryFrom = transfer.from;
        shipment.countryTo = transfer.to;
        shipment.carier = transfer.carier;
        await shipmentsRep.update(shipment);
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

async function changeStatus(req, res) {
    try {

        console.log("api shipment changeStatus");
        var transfer = req.body
        var shipment = await shipmentsRep.findById(transfer.shipmentId);
        shipment.status = transfer.status;
        await shipmentsRep.update(shipment);
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
    allSend: allSend,
    transfer: transfer,
    changeStatus: changeStatus
};
