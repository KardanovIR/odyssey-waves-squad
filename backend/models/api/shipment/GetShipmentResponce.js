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
        this.goods= new Array({
            id:'',
            type:'',
            description:'',
            value:'',
            quantity:'',
            wight:'',
        });
        this.claims= new Array({
            id:'',
            description:'',
            location:{
                longitude:'',
                latitude:''
            },
            createDate:'',
            creater:''
        }),
        this.extraInfo = new Array({
            id:'',
            description:'',
            location:{
                longitude:'',
                latitude:''
            },
            createDate:'',
            creater:''
        }),
        this.TransportRoute = new Array({
            SequenceNr:0,
            from:'',
            to:''
        }),
        this.metricData = new Array({
            id:'',
            type:'',
            value:'',
            deviceId:'',
            createDate:''
        })
    }
}
    
module.exports = GetShipmentResponce;