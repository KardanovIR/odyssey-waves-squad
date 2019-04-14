// metricController.js

metricsRep = require('../repository/metricsRepository');
shipmentRep = require('../repository/shipmentRepository');
claimRep = require('../repository/claimRepository');

CreateMetricRequsetModel = require('../models/api/metrics/CreateMetricRequest');
MetricResponceModel = require('../models/api/metrics/GetMetricResponce');
CreateClaimRequest = require('../models/api/claim/CreateClaimRequest');


async function create (req, res) {
    console.log("api metric create");
    var metrics = new CreateMetricRequsetModel();
    metrics.type=req.body.type ? req.body.type : "default";
    metrics.value=req.body.value ? req.body.value : "0";
    metrics.deviceId=req.body.deviceId ? req.body.deviceId : "0";
    metrics.createDate=req.body.createDate ? req.body.createDate : "";

    try {
        var metricId = await metricsRep.createMetrics(metrics);

        metrics.id = metricId;
        res.json({
            message: 'New metric created!',
            data: metrics
        });
    } catch (e) {
        res.json(e);
    }

    var shipment = shipmentRep.findByDeviceId(metrics.deviceId);
    if (shipment && shipment.conditionType === metrics.type) {
        if (metrics.value < shipment.conditionMin || metrics.value > shipment.conditionMax) {
            try {
                var claim = new CreateClaimRequest();
                claim.creater = "contract";
                claim.description = util.format('Value of %s = %s is out of limit [%s, %s]', metrics.type, metrics.value, shipment.conditionMin, shipment.conditionMax);
                claim.shipmentid = shipment.id;
                // todo get the last location
                claim.location = "right here";
                claim.createdate = metrics.createDate;
                var claimId = await claimRep.createClaim(claim);
                claim.id = claimId;
                console.log("new claim");
                console.log(claim);
            } catch (e) {
                console.error(e);
            }
        }
    }
}

async function index (req, res) {
    try {
        console.log("api metric index");
        var metrics = await metricsRep.getMetrics();
        res.json({
            status: "success",
            message: "Metric retrieved successfully",
            data: metrics
        });
    }
    catch (e) {
        console.log(e);
        res.json(e);
    }
};

async function view (req, res) {
    try {
        console.log("api metric view");
        var metricsId = req.params.metrics_id;
        var metrics = await metricsRep.findMetricsById(metricsId);
        res.json({
            status: "success",
            message: "Metric details successfully",
            data: metrics
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
