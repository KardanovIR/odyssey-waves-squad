import React from 'react'
import './styles.css'
import { Modal, Button } from 'react-bootstrap'
import { IShipment } from '@src/store/ShipmentsStore'

type callback = () => void


const capitalize = (s: string) => s && (s.charAt(0).toUpperCase() + s.slice(0))


export default class RecievePopup extends React.Component<{
  shipment: IShipment,
  open: boolean,
  onClose: callback,
  onRecieve: callback,
}> {

  state = {
    companyId: '',
  }


  goodDescription = (shipment: IShipment) => {
    if (shipment.conditionType === 'temperature sensitive') return capitalize(shipment.conditionType) + `: ${shipment.conditionMin}°C - ${shipment.conditionMax}°C`
    if (shipment.conditionType === 'humidity sensitive') return capitalize(shipment.conditionType) + `: ${shipment.conditionMin}% - ${shipment.conditionMin}%`
    return capitalize(shipment.conditionType)
  }


  render() {
    const { shipment } = this.props

    return <Modal show={this.props.open} onHide={() => { this.props.onClose() }}>
      <Modal.Header closeButton>
        <Modal.Title>
          <div style={{ padding: 20 }}>
            <div className='__h1'>Transfer shipment</div>
            <div className='__h3'>Carefully fill in all the fields to create a transportation</div>
          </div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div style={{ padding: 20 }}>
          <div className='__h2'>To</div>
          <div style={{ height: 10 }}></div>
          <div className='__h3'>Company id</div>
          <input className='__input'
            value={this.state.companyId}
            onChange={(e) => {
              this.setState({ ...this.state, companyId: e.target.value })
            }}
          />
          {/* <div style={{ height: 10 }}></div>
          <div className='__h3'>Company name</div>
          <input readOnly value={'adfa'} className='__input_readonly' */}
          />
          <div style={{ height: 20 }}></div>
          <div className='__h2'>Goods</div>
          <div className='__h3'>Specify the name or id of the cargo</div>
          <div style={{ height: 2 }}></div>
          <div className='__card_dark' style={{ padding: 20 }}>
            <div className='__h3'>Name</div>
            <div className='__h4'>{shipment.goods[0].id}</div>
            <div className='__h3'>Type</div>
            <div className='__h4'>{this.goodDescription(shipment)}</div>
          </div>
          <div style={{ height: 20 }}></div>
          <div className='__h2'>Documents</div>
          <div className='__h3'>Upload documents</div>
          <div className='__card_dotted' style={{
            height: 151,
            borderRadius: 2,
            cursor: 'pointer',
            border: 'solid 1px #dbe1e9',
          }}>
            <img style={{ marginLeft: '43%', marginTop: 30 }} src='assets/icons/upload.svg' ></img>
            <div style={{ textAlign: 'center', marginTop: 10 }} className='__h2'>Drag &amp; Drop your files or Browse</div>
          </div>
        </div>
        <Button variant='primary' style={{
          width: 430,
          height: 52,
          marginLeft: 18,
          marginBottom: 10,
          borderRadius: 2,
          boxShadow: '0 2px 7px 0 rgba(31, 90, 246, 0.2)',
          backgroundColor: '#1f5af6',
        }} onClick={() => { this.props.onRecieve() }}>
          <div className='__button_text_white'>Transfer</div>
        </Button>
      </Modal.Body>
    </Modal >
  }
}
