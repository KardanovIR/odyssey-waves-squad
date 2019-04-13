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
        this.goods= new Array({
            id='',
            type='',
            description='',
            value='',
            quantity='',
            wight='',
        });
    }
}
    
module.exports = User;