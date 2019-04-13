// GetClaimResponce.js

class CreateClaimRequest {
    constructor(){
        this.description = '';
        this.shipmentId = '';
        this.location = {
            longitude:'',
            latitude:''
        };
    }
}
    
module.exports = CreateClaimRequest;