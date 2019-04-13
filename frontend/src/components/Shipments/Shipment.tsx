import * as React from 'react'
import More from '@src/icons/More'
import { IShipment } from '@src/store/ShipmentsStore'

interface IShipmentProps {
  shipment: IShipment 
}

export default class Shipment extends React.Component<IShipmentProps> {
  render() {
    const { shipment } = this.props
    const statusEl = {
      'forming': <div className='Forming shipment__field'>Forming</div>,
      'formed': <div className='Formed shipment__field'>Formed</div>,
      'approved': <div className='Approved shipment__field'>Approved</div>,
      'onTheWay': <div className='On-the-Way shipment__field'>Forming</div>,
      'damaged': <div className='Damaged shipment__field'>Damaged</div>,
      'done': <div className='Done shipment__field'>Forming</div>,
    }[shipment.status]

    return <div className='shipment__root'>
      <div className={'shipment__infoContainer'}>
        <div className='shipment__fieldLabel'>Status</div>
        {statusEl}
      </div>
      <div className={'shipment__infoContainer'}>
        <div className='shipment__fieldLabel'>Recipient</div>
        <div className='shipment__field'>{shipment.recipient}</div>
      </div>
      <div className={'shipment__infoContainer'}>
        <div className='shipment__fieldLabel'>Departure date</div>
        <div className='shipment__field'>{shipment.departureDate}</div>
      </div>
      <div className='shipments__steps'>

      </div>
      <div className={'shipment__infoContainer'}>
        <div className='shipment__fieldLabel'>Arrival date</div>
        <div className='shipment__field'>{shipment.arrivalDate}</div>
      </div>
      <div>
        <More />
      </div>
    </div>
  }
}