import * as React from 'react'
import { inject, observer } from 'mobx-react'
import ShipmentsStore from '@store/ShipmentsStore'
import DatePicker from 'react-datepicker'

@inject('shipmentsStore')
@observer
export default class CargoInformation extends React.Component<{ shipmentsStore?: ShipmentsStore, onContinue: ()=> void }> {
  render(){
    const shipmentCreation = this.props.shipmentsStore!.shipmentCreation
    return <div className='createShipment__basicInfo'>
      <div className='createShipment__basicInfo_text'>Cargo Information</div>
      <div className='createShipment__basicInfo_textDescription'>Carefully fill in all the fields to create a transportation</div>
      <div className='load__root'>
        <div className='sender__text'>Specify the load</div>
        <div className='sender__textDescription'>Specify the name or id of the cargo</div>
        <input className='location_input'/>
        <div className='sender__textDescription'>Date</div>
      </div>
      <div className='createShipment__basicInfo_continue' onClick={this.props.onContinue}>Continue</div>
    </div>
  }
}