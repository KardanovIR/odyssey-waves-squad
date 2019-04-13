// contactController.js
db = require('../repository/repository')
// Import contact model
Contact = require('../models/contactModel');

// Handle index actions
async function index (req, res) {
    try {
        console.log("api contact index");
        var users = await db.getUsers();
        res.json({
            status: "success",
            message: "Contacts retrieved successfully",
            data: users
        });
    }
    catch (e) {
        console.log(e);
        res.json(e);
    }
};

// Handle create contact actions
async function create (req, res) {

    console.log("api contact create");
    var contact = new Contact();
    contact.name = req.body.name ? req.body.name : contact.name;
    contact.email = req.body.email;
    try {
        var userId = await db.createUser(contact);
        contact._id = userId;

        res.json({
                message: 'New contact created!',
                data: contact
        });
    }
    catch (e) {
        res.json(e);
    }
};

// Handle view contact info
exports.view = function (req, res) {

    console.log("api contact view");
    Contact.findById(req.params.contact_id, function (err, contact) {
        if (err)
            res.send(err);
        res.json({
            message: 'Contact details loading..',
            data: contact
        });
    });
};

// Handle update contact info
exports.update = function (req, res) {
    console.log("api contact update");
    Contact.findById(req.params.contact_id, function (err, contact) {
        if (err)
            res.send(err);

    contact.name = req.body.name ? req.body.name : contact.name;
        contact.gender = req.body.gender;
        contact.email = req.body.email;
        contact.phone = req.body.phone;

    // save the contact and check for errors
        contact.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                message: 'Contact Info updated',
                data: contact
            });
        });
    });
};

// Handle delete contact
exports.delete = function (req, res) {
    console.log("api contact delete");
    Contact.remove({
        _id: req.params.contact_id
    }, function (err, contact) {
        if (err)
            res.send(err);

    res.json({
            status: "success",
            message: 'Contact deleted'
        });
    });
};

module.exports = {
    index: index,
    create: create,
};
