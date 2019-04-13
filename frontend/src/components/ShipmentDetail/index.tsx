import React from 'react'
import './styles.css'
import StatusFilter from '@components/Shipments/StatusFilter'
import OtherFilter from '@components/Shipments/OtherFilter'
import ShipmentsStore from '@store/ShipmentsStore'
import Shipment from '@components/Shipments/Shipment'


export default class ShipmentDetail extends React.Component<{ shipmentsStore?: ShipmentsStore, edit: boolean }> {

  render() {
    const shipmentsStore = this.props.shipmentsStore!
    return <div className='shipmentsDetail__root'>

    </div>
  }
}