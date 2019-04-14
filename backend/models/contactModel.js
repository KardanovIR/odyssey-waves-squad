// contactModel.js

var Contact = function (name, email) {
    this.name = name;
    this.email = email;
}

Contact.prototype.name = "";
Contact.prototype.email = "";

module.exports = Contact;