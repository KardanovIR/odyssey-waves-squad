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
// Contact routes
router.route('/contacts')
    .get(contactController.index)
    .post(contactController.create);
router.route('/waves')
    .get(wavesController.getLastBlock);
router.route('/user/login')
    .get(userController.login);
// router.route('/contacts/:contact_id')
//     .get(contactController.view)
//     .patch(contactController.update)
//     .put(contactController.update)
//     .delete(contactController.delete);

// Export API routes
module.exports = router;