import * as React from 'react'
import { inject, observer } from 'mobx-react'
import ShipmentsStore from '@store/ShipmentsStore'
import DatePicker from 'react-datepicker'

@inject('shipmentsStore')
@observer
export default class BasicInfo extends React.Component<{ shipmentsStore?: ShipmentsStore, onContinue: () => void }> {
  render() {
    const shipmentCreation = this.props.shipmentsStore!.shipmentCreation
    return <div className='createShipment__basicInfo'>
      <div className='createShipment__basicInfo_text'>Basic information</div>
      <div className='createShipment__basicInfo_textDescription'>Carefully fill in all the fields to create a
        transportation
      </div>
      <div className='sender__root'>
        <div className='sender__text'>Sender</div>
        <div className='sender__textDescription'>Specify the place where the carrier should pick up the goods</div>
        <input className='location_input'
          value={shipmentCreation.from}
          onChange={(e) => shipmentCreation.from = e.target.value}
        />
        <div className='sender__textDescription'>Date</div>
        <DatePicker
          className='__datePicker'
          selected={shipmentCreation.departureDate == null ? undefined : new Date(shipmentCreation.departureDate)}
          selectsStart
          // startDate={this.state.startDate}
          // endDate={this.state.endDate}
          onChange={e => shipmentCreation.departureDate = e == null ? undefined : e.toDateString()}
        />
      </div>
      <div className='recipient_root'>
        <div className='sender__text'>Recipient</div>
        <div className='sender__textDescription'>Recipient Key</div>
        <input className='recipient_input'
          value={shipmentCreation.recipient}
          onChange={(e) => shipmentCreation.recipient = e.target.value}
        />
        <div className='sender__textDescription'>Specify the place where the carrier should deliver the goods</div>
        <input className='location_input'
          value={shipmentCreation.to}
          onChange={(e) => shipmentCreation.to = e.target.value}
        />
        <div className='sender__textDescription'>Date</div>
        <DatePicker
          className='__datePicker'
          selected={shipmentCreation.arrivalDate == null ? undefined : new Date(shipmentCreation.arrivalDate)}
          selectsStart
          // startDate={this.state.startDate}
          // endDate={this.state.endDate}
          onChange={e => shipmentCreation.arrivalDate = e == null ? undefined : e.toDateString()}
        />
      </div>
      <div className='createShipment__basicInfo_continue' onClick={this.props.onContinue}>Continue</div>
    </div>
  }
}