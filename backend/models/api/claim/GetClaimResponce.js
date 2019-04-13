// GetClaimResponce.js

class GetClaimResponce {
    constructor(){
        this.id = '';
        this.createDate = '';
        this.description = '';
        this.shipmentId = '';
        this.location = {
            longitude:'',
            latitude:''
        };
        this.creater= ''
    }
}
    
module.exports = GetClaimResponce;