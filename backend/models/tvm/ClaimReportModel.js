var ClaimReportModel = {
    PolicyID: 'string',
    DateTime: '2019-04-12T13:02:15.751Z',
    ClaimDescription: 'string',
    Handovers: [
      {
        FromParty: 'string',
        ToParty: 'string',
        // OK, DAMAGED, LOST 
        GoodsStatus: 'OK'
      }
    ],
    Locations: [
      {
        Longitude: 0,
        Latitude: 0
      }
    ]
  }

    
module.exports = ClaimReportModel;