// userController.js
// Import contact model
Contact = require('../models/contactModel');

db = require('../repository/repository')

UserModel = require('../models/api/LoginUserModel');

// Handle index actions
async function login (req, res) {
    try {
        var userId=req.params.user_id;
        console.log("login");
        var user = new UserModel();
        // await db.getUser(userId);
        res.json({
            status: "success",
            message: "login",
            data: user
        });
    }
    catch (e) {
        console.log(e);
        res.json(e);
    }
};

module.exports = {
    login: login,
};
