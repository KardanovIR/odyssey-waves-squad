// CreateShipmentRequest.js

class CreateShipmentRequest {
    constructor(){
        this.id = '';
        this.title='';
        this.sender ='';
        this.recipient = '';
        this.from='';
        this.to='';
        this.departureDate='';
        this.policeId='';
        this.carrier='';
        this.createDate='';
        this.goods= new Array();
    }
}
    
module.exports = CreateShipmentRequest;