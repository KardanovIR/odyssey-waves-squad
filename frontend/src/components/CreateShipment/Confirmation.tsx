import * as React from 'react'
import {inject, observer} from 'mobx-react'
import ShipmentsStore from '@store/ShipmentsStore'
import DatePicker from 'react-datepicker'

@inject('shipmentsStore')
@observer
export default class BasicInfo extends React.Component<{ shipmentsStore?: ShipmentsStore, onContinue: () => void }> {
  render() {
    const shipmentCreation = this.props.shipmentsStore!.shipmentCreation
    return <div className='createShipment__basicInfo'>
      <div className='createShipment__basicInfo_continue' onClick={this.props.onContinue}>Finish</div>
    </div>
  }
}