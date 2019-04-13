// GetShipmentResponce.js

class GetShipmentResponce {
    constructor(){
        this.id = '';
        this.title='';
        this.sender ='';
        this.recipient = '';
        this.from='';
        this.to='';
        this.departureDate='';
        this.policyId='';
        this.carrier='';
        this.goods= new Array();
        this.claims= new Array(),
        this.extraInfo = new Array(),
        this.transportRoute = new Array(),
        this.metricData = new Array()
    }
}

var goods = {
    id:'',
    type:'',
    description:'',
    value:'',
    quantity:'',
    wight:'',
}

var claim = {
    id:'',
    description:'',
    location:{
        longitude:'',
        latitude:''
    },
    createDate:'',
    creater:''
}
    
var extraInfo = {
    id:'',
    description:'',
    location:{
        longitude:'',
        latitude:''
    },
    createDate:'',
    creater:''
}

var transportRoute = {
    shipmentId: 0,
    sequenceNr: 0,
    countryFrom:'',
    countryTo:'',
    carrier:'',
    createDate:''
}

var metricaDate = {
    id:'',
    type:'',
    value:'',
    deviceId:'',
    createDate:''
}

module.exports = GetShipmentResponce;