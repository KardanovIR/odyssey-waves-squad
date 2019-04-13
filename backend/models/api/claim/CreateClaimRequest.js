class CreateClaimRequest {
    constructor() {
        this.creater = '';
        this.description = '';
        this.shipmentId = '';
        this.location = {
            longitude: '',
            latitude: ''
        };
        this.createDate = '';
    }
}

module.exports = CreateClaimRequest;