import * as React from 'react'
// import './styles.css'
import BasicInfo from '@components/CreateShipment/BasicInfo'
import CargoInformation from '@components/CreateShipment/CargoInformation'
import * as Highcharts from 'highcharts';
//import * as Exporting from 'highcharts/modules/exporting';
import {data} from "@waves/waves-transactions";

const moment = require('moment');


export default class Index extends React.Component<any, { step: number }> {
    state = {
        step: 0,
    };

    constructor(props) {
        super(props);
        this.getMetrics();
        setInterval(() => {
            this.getMetrics();
        }, 10000);
    }

    render() {
        const {step} = this.state;

        return (
            <div className='createShipment__root'>
                <div className='createShipment__steps'>
                    {/*<div className='createShipment__steps_text'>Create Shipment</div>*/}
                    {/*<div className='createShipment__steps_textDescription'>Create shipment text description</div>*/}
                </div>
                <div className='createShipment__rightContainer'>
                    <div id="container"/>
                </div>
            </div>
        )
    }
}
