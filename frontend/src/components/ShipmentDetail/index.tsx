import React from 'react'
import './styles.css'
import StatusFilter from '@components/Shipments/StatusFilter'
import OtherFilter from '@components/Shipments/OtherFilter'
import ShipmentsStore from '@store/ShipmentsStore'
import Shipment from '@components/Shipments/Shipment'


export default class ShipmentDetail extends React.Component<{ shipmentsStore?: ShipmentsStore }> {

  render() {
    const shipmentsStore = this.props.shipmentsStore!
    return <div className='shipments__root'>
      <div className='shipments__left'>
        <StatusFilter/>
        <OtherFilter/>
      </div>
      <div className='shipments__right'>
        <div className='shipments__right_topBar'>
          <div className='shipments__right_topBar_text'>
            <div className='shipments__right_topBar_label'>Shipments</div>
            <div className='shipments__right_topBar_count'>Found {shipmentsStore.shipments.length} shipments</div>
          </div>
          <div className='shipments__right_tobBar_addBtn'>+ Add Shipment</div>
        </div>
        <div className={'shipments__right_shipments'}>
          {shipmentsStore.shipments.map((shipment, i) => <Shipment key={i} shipment={shipment}/>)}
        </div>
      </div>
    </div>
  }
}