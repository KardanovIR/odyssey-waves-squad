// api-routes.js

// Initialize express router
let router = require('express').Router();


// Set default API response
router.get('/', function (req, res) {
    res.json({
        status: 'API Its Working',
        message: 'Welcome to RESTHub crafted with love!',
    });
});

// Import contact controller
var contactController = require('./controllers/contactController');
var wavesController = require('./controllers/wavesController');
var userController = require('./controllers/userController');
var claimController = require('./controllers/claimController');
var goodsController = require('./controllers/goodsController');
var extraInfoController = require('./controllers/extraInfoController');
var metricsController = require('./controllers/metricsController');
var shipmentsController = require('./controllers/shipmentsController');
// Contact routes
router.route('/contacts')
    .get(contactController.index)
    .post(contactController.create);
router.route('/waves')
    .get(wavesController.getLastBlock);
router.route('/user/login')
    .get(userController.login);
router.route('/claims')
    .get(claimController.index)
    .post(claimController.create);
router.route('/claims/:claim_id')
    .get(claimController.view);
router.route('/goods')
    .get(goodsController.index)
    .post(goodsController.create);
router.route('/goods/:goods_id')
    .get(goodsController.view);
router.route('/extraInfo')
    .get(extraInfoController.index)
    .post(extraInfoController.create);
router.route('/extraInfo/:extraInfo_id')
    .get(extraInfoController.view);
router.route('/metrics')
    .get(metricsController.index)
    .post(metricsController.create);
router.route('/metrics/:metrics_id')
    .get(metricsController.view);
router.route('/shipments/')
    .get(shipmentsController.index)
    .post(shipmentsController.create);
router.route('/shipments/update')
    .post(shipmentsController.update);
router.route('/shipments/:shipment_id')
    .get(shipmentsController.view);
router.route('/shipments/recived/:user_id')
    .get(shipmentsController.allRecived);
router.route('/shipments/send/:user_id')
    .get(shipmentsController.allSend);
router.route('/shipments/carier/:user_id')
    .get(shipmentsController.allCarier);
router.route('/shipments/transfer')
    .post(shipmentsController.transfer);
router.route('/shipments/changeStatus')
    .post(shipmentsController.changeStatus);
// router.route('/contacts/:contact_id')
//     .get(contactController.view)
//     .patch(contactController.update)
//     .put(contactController.update)
//     .delete(contactController.delete);

// Export API routes
module.exports = router;