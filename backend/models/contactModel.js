// contactModel.js

var Contact = function (name, email) {
    this.name = name;
    this.email = email;
}
    
Contact.prototype.name = "";
Contact.prototype.email = "";
    
    //Contact.prototype.changeName = function (name) {
    //this.data.name = name;
    //}
    
    //Contact.findById = function (id, callback) {
    //db.get('users', {id: id}).run(function (err, data) {
    //if (err) return callback(err);
    //callback(null, new User(data));
    //});
    //}
    
module.exports = Contact;