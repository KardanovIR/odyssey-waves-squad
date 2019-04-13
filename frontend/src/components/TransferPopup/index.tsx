import React from 'react'
import './styles.css'
import { Modal, Button } from 'react-bootstrap'

type callback = () => void

export default class TransferPopup extends React.Component<{ open: boolean, onClose: callback, onTransfer: callback }> {
  render() {
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
          />
          <div style={{ height: 10 }}></div>
          <div className='__h3'>Company name</div>
          <input readOnly value={'adfa'} className='__input_readonly'
          />
          <div style={{ height: 20 }}></div>
          <div className='__h2'>Goods</div>
          <div className='__h3'>Specify the name or id of the cargo</div>
          <div style={{ height: 2 }}></div>
          <div className='__card_dark' style={{ padding: 20 }}>
            <div className='__h3'>Name</div>
            <div className='__h4'>Coca-cola</div>
            <div className='__h3'>Type</div>
            <div className='__h4'>Temperature sensitive:  30°C - 60°C</div>
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
        }} onClick={() => { this.props.onTransfer() }}>
          <div className='__button_text_white'>Transfer</div>
        </Button>
      </Modal.Body>
    </Modal >
  }
}
