var BillLandingModel = {
    BillOfLadingID: 'string',
    Sender: 'string',
    Receiver: 'string',
    Carrier: 'string',
    fromCountry: 'string',
    fromPlace: 'string',
    toCountry: 'string',
    toPlace: 'string',
    //PENDING, PAYED, CANCELLED
    PaymentStatus: 'PENDING',
    Goods: [
      {
        GoodsID: 'string',
        //CONTAINER, LIQUID, DRY, BREAKBULK, RORO
        GoodsType: 'CONTAINER',
        Description: 'string',
        Value: 0,
        Quantity: 0,
        Weight: 0,
        //OK, DAMAGED, LOST 
        Status: 'OK'
      }
    ],
    TransportRoutes: [
      {
        SequenceNr: 0,
        FromCountry: 'string',
        FromPlace: 'string',
        ToCountry: 'string',
        ToPlace: 'string'
      }
    ]
  }

    
module.exports = BillLandingModel;