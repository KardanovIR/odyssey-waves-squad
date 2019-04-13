import * as React from 'react'
import {inject, observer} from 'mobx-react'
import ShipmentsStore from '@store/ShipmentsStore'

@inject('shipmentsStore')
@observer
export default class BasicInfo extends React.Component<{shipmentsStore?: ShipmentsStore}> {
  render(){
    const shipmentCreation = this.props.shipmentsStore!.shipmentCreation
    return <div className='createShipment__basicInfo'>
      <div className='createShipment__basicInfo_text'>Basic information</div>
      <div className='createShipment__basicInfo_textDescription'>Carefully fill in all the fields to create a transportation</div>
      <div className='createShipment__sender_text'>Sender</div>
      <div className='createShipment__sender_textDescription'>Specify the place where the carrier should pick up the goodsSpecify the place where the carrier should pick up the goods</div>
    </div>
  }
}