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
        this.policeId='';
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
    SequenceNr:0,
    from:'',
    to:''
}

var metricaDate = {
    id:'',
    type:'',
    value:'',
    deviceId:'',
    createDate:''
}

module.exports = GetShipmentResponce;