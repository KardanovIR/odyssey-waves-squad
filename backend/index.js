// Import express
let express = require('express');
// Import Body parser
let bodyParser = require('body-parser');
// Initialize the app
let app = express();
// Import routes
let apiRoutes = require("./api-routes");

let Config = require("./config/config");

var swaggerUi = require('swagger-ui-express'),
swaggerDocument = require('./doc/swagger.json');

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// Send message for default URL
app.get('/', (req, res) => res.send('Hello World with Express'));

// Use Api routes in the App
app.use('/api', apiRoutes)

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// Launch app to listen to specified port
app.listen(Config.app.port, function () {
    console.log("Running RestHub on port " + Config.app.port);
});