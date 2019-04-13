// GetClaimResponce.js

class GetClaimResponce {
    constructor(){
        this.id = '';
        this.creater = '';
        this.createDate = '';
        this.description = '';
        this.shipmentId = '';
        this.location = {
            longitude:'',
            latitude:''
        };
    }
}
    
module.exports = GetClaimResponce;