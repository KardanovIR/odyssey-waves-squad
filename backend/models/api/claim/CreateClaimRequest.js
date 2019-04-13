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
    }
}
    
module.exports = CreateClaimRequest;