import React from 'react'
import './styles.css'
import StatusFilter from '@components/Shipments/StatusFilter'
import OtherFilter from '@components/Shipments/OtherFilter'
import ShipmentsStore, { IShipment, TGood } from '@store/ShipmentsStore'
import Shipment from '@components/Shipments/Shipment'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { inject } from 'mobx-react'
import Calendar from '@src/icons/Calendar'
import Pin from '@src/icons/Pin'
import TransferPopup from '@components/TransferPopup'
import AuthStore from '@src/store/AuthStore'

const capitalize = (s: string) => s && (s.charAt(0).toUpperCase() + s.slice(0))
@withRouter
@inject('shipmentsStore', 'authStore')
export default class ShipmentDetail extends React.Component<{
  shipmentsStore?: ShipmentsStore,
  authStore?: AuthStore,
  history: any,
  match: any
}> {

  state = {
    showTransferPopup: false,
  }

  onTransferPopupClose() {
    this.setState({ showTransferPopup: false })
  }

  onTransferPopupTransfer() {
    this.setState({ showTransferPopup: false })
  }

  openTransferPopup() {
    this.setState({ showTransferPopup: true })
  }

  openApprovePopup() {
    this.setState({ showApprovePopup: true })
  }

  goodDescription = (good: TGood) => {
    if (good.type === 'temperature sensitive') return capitalize(good.type) + `: ${good.tFrom}°C - ${good.tTo}°C`
    if (good.type === 'humidity sensitive') return capitalize(good.type) + `: ${good.hFrom}% - ${good.hTo}%`
    return capitalize(good.type)
  }

  render() {



    const shipmentsStore = this.props.shipmentsStore!
    const authStore = this.props.authStore!
    const currentUser = authStore.currentUser || { publicKey: '' }

    const id = this.props.match.params.id

    const shipment: IShipment = shipmentsStore.shipments.find(sh => sh.id === id)!

    const getShipmentButton = () => {
      if (shipment.status === 'onTheWay' || shipment.status === 'approved' || shipment.status === 'damaged')
        return <div style={{ marginLeft: 23 }} className='shipments__right_tobBar_addBtn' onClick={() => {
          this.openTransferPopup()
        }}>Transfer</div>

      if (shipment.status === 'forming' && shipment.recipient === currentUser.publicKey)
        return <div style={{ marginLeft: 23, backgroundColor: '#eb4d4b' }} className='shipments__right_tobBar_addBtn' onClick={() => {
          this.openApprovePopup()
        }}>Approve</div>

      return []
    }

    if (shipment == null) return <div></div>

    const good = shipment.goods[0] || {}
    console.log(shipment)
    return <div className='shipmentDetail__root'>
      {/*<div className='shipmentDetail__map'></div>*/}
      <div className='shipmentDetail__content'>
        <div className='shipmentDetail__left'>
          <div className='shipmentDetail__left_title'>
            <div className='root_title'>{shipment.title}</div>
            <div className='description_text' style={{ marginTop: 5 }}>Shipment description</div>
          </div>

          <div className='shipmentDetail__left_sender'>
            <div className='shipmentDetail__left_senderSubtitle root_subtitle'>Sender</div>
            <div className='description_text' style={{ marginTop: 15 }}>Where the carrier should pick up the goods</div>
            <div className='shipmentDetail__left_senderLocationContainer'>
              <Pin />
              <div className='label_text' style={{ marginLeft: 10 }}>{shipment.from}</div>
            </div>
            <div className='description_text' style={{ marginTop: 35 }}>Date</div>
            <div className='shipmentDetail__left_dateContainer'>
              <Calendar />
              <div className='shipmentDetail__left_dateText date_font'>{shipment.departureDate}</div>
            </div>
          </div>

          <div className='shipmentDetail__left_recipient'>
            <div className='shipmentDetail__left_senderSubtitle root_subtitle'>Recipient</div>
            <div className='description_text' style={{ marginTop: 15 }}>Recipient key</div>
            <div className='label_text' style={{ marginTop: 15 }}>{shipment.recipient}</div>
            <div className='description_text' style={{ marginTop: 15 }}>Where the carrier should deliver the goods</div>
            <div className='shipmentDetail__left_senderLocationContainer'>
              <Pin />
              <div className='label_text' style={{ marginLeft: 10 }}>{shipment.to}</div>
            </div>
            <div className='description_text' style={{ marginTop: 35 }}>Date</div>
            <div className='shipmentDetail__left_dateContainer'>
              <Calendar />
              <div className='shipmentDetail__left_dateText date_font'>{shipment.arrivalDate}</div>
            </div>
          </div>

          <div className='shipmentDetail__left_goods'>
            <div className='shipmentDetail__left_senderSubtitle root_subtitle'>Goods</div>
            <div className='description_text' style={{ marginTop: 15 }}>Name or id of the cargo</div>

            <div className='shipmentDetail__left_goodsCard'>
              <div className='description_text' style={{ marginTop: 15 }}>ID</div>
              <div className='label_text' style={{ marginTop: 15 }}>{good.id}</div>
              <div className='description_text' style={{ marginTop: 15 }}>Type</div>
              <div className='label_text' style={{ marginTop: 15 }}>{this.goodDescription(good)}</div>
            </div>
          </div>

        </div>
        <div className='shipmentDetail__right'>
          {getShipmentButton()}
          <img style={{
            maxWidth: '85%',
            height: 'auto',
          }} src='assets/img/rightSidePath.png'></img>
        </div>
      </div>

      <TransferPopup open={this.state.showTransferPopup}
        onClose={() => { this.onTransferPopupClose() }}
        onTransfer={() => { this.onTransferPopupTransfer() }}
      />

    </div>
  }
}