// shipmentController.js
shipmentsRep = require('../repository/shipmentRepository');
goodsRep = require('../repository/goodsRepository');
claimRep = require('../repository/claimRepository');
extraInfoRep = require('../repository/extraInfoRepository');
routeRep = require('../repository/routeRepository');
metricRep = require('../repository/metricsRepository');
tvmClient = require('../services/tvmClient');
wavesClient = require('../services/wavesClient');
InsureCargoResponce = require('../models/tvm/InsureCargoResponce');
BillLanding = require('../models/tvm/BillLandingModel');

CreateShipmentModel = require('../models/api/shipment/CreateShipmentRequest');
GetShipmentModel = require('../models/api/shipment/GetShipmentResponce');

function formatDate(date) {
    let now = new Date();
    let diff = now - date;
    let secDiff = Math.floor(diff / 1000);


    // helper formatter
    const zeroFormat = unit => (unit < 10) ? `0${unit}` : unit;

    let day = zeroFormat(date.getDate());
    let month = zeroFormat(date.getMonth() + 1);
    let hours = zeroFormat(date.getHours());
    let minutes = zeroFormat(date.getMinutes());
    let year = String(date.getFullYear());

    return `${year}.${month}.${day}`;
}

async function create(req, res) {
    console.log("api shipment create");
    try {
        var shipment = req.body;
        shipment.createDate = formatDate(new Date());
        // .var insureCargoResponse = await tvmClient.insureCargo(shipment);
        // shipment.policyId = insureCargoResponse.PolicyID;
        var newShipment = await shipmentsRep.createShipment(shipment);
        
       
        if (typeof shipment.goods  !== 'undefined') {
            shipment.goods.forEach(async (entry) => {
                entry.shipmentId = newShipment.id
                await goodsRep.create(entry);
            });
        }
        var blockchainTx = await wavesClient.writeDataToWaves('shipment_' + shipment.id, shipment);
        console.log(blockchainTx);
        res.json({
            message: 'New shipment created!',
            data: newShipment
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
        var fullShipments = await getFullShipments(shipments);
        res.json({
            status: "success",
            message: "Shipments retrieved successfully",
            data: fullShipments
        });

    }
    catch (e) {
        console.log(e);
        res.json(e);
    }
};

async function getFullShipments(shipments) {
    return new Promise((resolve, reject) => {
        var fullShipments = [];
        console.log("count",shipments.length);
        if (shipments.length === 0)
            resolve([]);
        else
            shipments.forEach(async (shipment, i) => {
                console.log("shipmentId",shipment.id);
                shipment.goods = await goodsRep.findByShipmentId(shipment.id);
                console.log("goods count",shipment.goods.length);
                shipment.claims = await claimRep.findByShipmentId(shipment.id);
                shipment.extraInfo = await extraInfoRep.findByShipmentId(shipment.id);
                shipment.transportRoute = await routeRep.findByShipmentId(shipment.id);
                //shipment.metricData = await metricRep.findByDeviceId(shipment.device);
                fullShipments.push(shipment);
                if (shipments.length - 1 === i) {
                    resolve(fullShipments);
                }
            });
    })
}

async function allRecived(req, res) {
    try {
        console.log("api shipment allRecived");
        var userId = req.params.user_id
        var shipments = await shipmentsRep.getShipmentsByRecipientId(userId);
        var fullShipments = await getFullShipments(shipments);
        res.json({
            status: "success",
            message: "Recived Shipments retrieved successfully",
            data: fullShipments
        });
    }
    catch (e) {
        console.log(e);
        res.json(e);
    }
}

async function allSend(req, res) {
    try {

        var userId = req.params.user_id;
        console.log("api shipment allSend " + userId);
        var shipments = await shipmentsRep.getShipmentsBySenderId(userId);

        var fullShipments = await getFullShipments(shipments);
        res.json({
            status: "success",
            message: "Send Shipments retrieved successfully",
            data: fullShipments
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
        var fullShipments = await getFullShipments(shipments);
        res.json({
            status: "success",
            message: "Carier Shipments retrieved successfully",
            data: fullShipments
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

async function update(req, res) {
    console.log("api shipment create");
    try {
        var shipment = req.body;
        // .var insureCargoResponse = await tvmClient.insureCargo(shipment);
        // shipment.policyId = insureCargoResponse.PolicyID;
        await shipmentsRep.update(shipment);
        if (typeof shipment.goods !== 'undefined') {
            updateGoods(shipment.goods, shipment.id);
        }
        if (typeof shipment.claims !== 'undefined') {
            updateClaims(shipment.claims, shipment.id);
        }
        if (typeof shipment.extraInfo !== 'undefined') {
            updateExtraInfo(shipment.extraInfo, shipment.id);
        }
        if (typeof shipment.transportRoute !== 'undefined') {
            updateRoutes(shipment.transportRoute, shipment.id);
        }
        res.json({
            message: 'Shipment updated!',
            data: shipment
        });
    }
    catch (e) {
        console.log(e);
        res.json(e);
    }
};

async function updateGoods(goods, shipmentId) {
    goods.forEach(async (entry) => {
        if (entry.id)
            await goodsRep.update(entry);
        else {
            entry.shipmentId = shipmentId;
            await goodsRep.insert(entry);
        }
    });
}

async function updateClaims(claims, shipmentId) {
    claims.forEach(async (entry) => {
        if (entry.id)
            await claimRep.update(entry);
        else {
            entry.shipmentId = shipmentId;
            await claimRep.insert(entry);
        }
    });
}

async function updateExtraInfo(extraInfo, shipmentId) {
    extraInfo.forEach(async (entry) => {
        if (entry.id)
            await extraInfoRep.update(entry);
        else {
            entry.shipmentId = shipmentId;
            await extraInfoRep.insert(entry);
        }
    });
}

async function updateRoutes(routes, shipmentId) {
    routes.forEach(async (entry) => {
        if (entry.id)
            await routeRep.update(entry);
        else {
            entry.shipmentId = shipmentId;
            await routeRep.insert(entry);
        }
    });
}
module.exports = {
    index: index,
    create: create,
    view: view,
    allRecived: allRecived,
    allCarier: allCarier,
    allSend: allSend,
    transfer: transfer,
    changeStatus: changeStatus,
    update: update
};
