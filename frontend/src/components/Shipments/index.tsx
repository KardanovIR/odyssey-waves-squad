import React from 'react'
import './styles.css'
import StatusFilter from '@components/Shipments/StatusFilter'
import OtherFilter from '@components/Shipments/OtherFilter'
import { inject, observer } from 'mobx-react'
import ShipmentsStore from '@store/ShipmentsStore'
import Shipment from '@components/Shipments/Shipment'
import { Modal, Button } from 'react-bootstrap'

@inject('shipmentsStore')
@observer
export default class Shipments extends React.Component<{ shipmentsStore?: ShipmentsStore }> {

  state = {
    show: false,
  }

  handleClose() {
    this.setState({ show: false })
  }

  open() {
    this.setState({ show: true })
  }

  render() {
    const shipmentsStore = this.props.shipmentsStore!
    return <div className='shipments__root'>
      <div className='shipments__left'>
        <StatusFilter />
        <OtherFilter />
      </div>
      <div className='shipments__right'>
        <div className='shipments__right_topBar'>
          <div className='shipments__right_topBar_text'>
            <div className='shipments__right_topBar_label'>Shipments</div>
            <div className='shipments__right_topBar_count'>Found {shipmentsStore.shipments.length} shipments</div>
          </div>

          <div className='shipments__right_tobBar_addBtn' onClick={() => {
            this.open()
          }}>+ Add Shipment</div>
        </div>
        <div className={'shipments__right_shipments'}>
          {shipmentsStore.visibleShipments.map((shipment, i) => <Shipment key={i} shipment={shipment} />)}
        </div>
      </div>
      <Modal show={this.state.show} onHide={() => { this.handleClose() }}>
        <Modal.Header closeButton>
          <Modal.Title>Transfer shipment</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant='primary' onClick={() => { this.handleClose() }}>
            Transfer
            </Button>
        </Modal.Footer>
      </Modal>
    </div>

  }
}
