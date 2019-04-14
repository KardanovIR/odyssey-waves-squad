import * as React from 'react'
// import './styles.css'
import BasicInfo from '@components/CreateShipment/BasicInfo'
import CargoInformation from '@components/CreateShipment/CargoInformation'
import * as Highcharts from 'highcharts'
//import * as Exporting from 'highcharts/modules/exporting';

const moment = require('moment')


export default class Index extends React.Component<any, { step: number }> {
  state = {
    step: 0,
  }

  getMetrics() {
    fetch('http://backend.odyssey.wavesplatform.com:8080/api/metrics')
      .then(res => res.json())
      .then(json => {

        const temperatureMetrics = json.data
          .filter((item) => item.type === 'temperature')
        const temperatureMax: any[] = []
        const temperatureMin: any[] = []
        const temperatureData: any[] = []
        temperatureMetrics
          .sort((a, b) => {
            return a[0] > b[0]
          })
          .forEach((item) => {
            console.log(item.createdate)
            const timestamp = moment(item.createdate, 'DD.MM.YYYY HH:mm:ss').unix() * 1000
            temperatureMax.push(new Array(timestamp, 25))
            temperatureMin.push(new Array(timestamp, -10))
            temperatureData.push([timestamp, parseFloat(item.value)])
          })

        console.log(temperatureData)

        // Exporting(Highcharts);
        Highcharts.chart('container', {
          chart: {
            // type: 'spline'
          },
          title: {
            text: 'Solar Employment Growth by Sector, 2010-2016',
          },
          xAxis: {
            type: 'datetime',
            dateTimeLabelFormats: { // don't display the dummy year
              month: '%e. %b',
              year: '%b',
            },
            title: {
              text: 'Date',
            },
          },
          subtitle: {
            text: 'Source: thesolarfoundation.com',
          },
          yAxis: {
            title: {
              text: 'Number of Employees',
            },
            plotLines: [],
          },
          legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
          },
          plotOptions: {
            spline: {
              marker: {
                enabled: true,
              },
            },
          },
          series: [{
            name: 'Temperature',
            data: temperatureData,
          }, {
            name: 'Temperature max',
            color: 'red',
            dashStyle: 'longdash',
            data: temperatureMax,
          }, {
            name: 'Temperature min',
            color: 'red',
            dashStyle: 'longdash',
            data: temperatureMin,
          }],
        })
      })
      .catch(console.log)

  }

  constructor(props) {
    super(props)
    this.getMetrics()
    setInterval(() => {
      this.getMetrics()
    }, 10000)
  }

  render() {
    const { step } = this.state

    return (
      <div className='createShipment__root'>
        <div className='createShipment__steps'>
          {/*<div className='createShipment__steps_text'>Create Shipment</div>*/}
          {/*<div className='createShipment__steps_textDescription'>Create shipment text description</div>*/}
        </div>
        <div className='createShipment__rightContainer'>
          <div id='container' />
        </div>
      </div>
    )
  }
}
