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
        this.arrivalDate='';
        this.device='';
        this.goods= new Array({
            id:'',
            type:'',
            description:'',
            value:'',
            quantity:'',
            wight:'',
        });
        this.conditionMin='';
        this.conditionMax='';
        this.conditionType='';
        this.status='';
    }
}
    
module.exports = CreateShipmentRequest;