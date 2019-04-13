// GetClaimResponce.js

class CreateClaimRequest {
    constructor(){
        this.createrId = '';
        this.description = '';
        this.shipmentId = '';
        this.location = {
            longitude:'',
            latitude:''
        };
        this.createDate='';
    }
}
    
module.exports = CreateClaimRequest;