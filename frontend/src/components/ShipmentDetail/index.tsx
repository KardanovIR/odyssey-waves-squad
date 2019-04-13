import React from 'react'
import './styles.css'
import StatusFilter from '@components/Shipments/StatusFilter'
import OtherFilter from '@components/Shipments/OtherFilter'
import ShipmentsStore, {IShipment} from '@store/ShipmentsStore'
import Shipment from '@components/Shipments/Shipment'
import {withRouter, RouteComponentProps} from 'react-router-dom'
import {inject} from 'mobx-react'
import Calendar from '@src/icons/Calendar'
import Pin from '@src/icons/Pin'

const capitalize = (s: string) => s && (s.charAt(0).toUpperCase() + s.slice(0))
@withRouter
@inject('shipmentsStore')
export default class ShipmentDetail extends React.Component<{ shipmentsStore?: ShipmentsStore, history: any, match: any }> {

  goodDescription = (shipment: IShipment) => {
    if (shipment.conditionType === 'temperature sensitive' ) return capitalize(shipment.conditionType) + `: ${shipment.conditionMin}°C - ${shipment.conditionMax}°C`
    if (shipment.conditionType === 'humidity sensitive') return capitalize(shipment.conditionType) + `: ${shipment.conditionMin}% - ${shipment.conditionMin}%`
    return capitalize(shipment.conditionType)
  }
  render() {

    const shipmentsStore = this.props.shipmentsStore!
    const id = this.props.match.params.id

    const shipment = shipmentsStore.shipments.find(sh => sh.id === id)

    if (shipment == null) return <div></div>

    const good = shipment.goods[0] || {}
    console.log(shipment)
    return <div className='shipmentDetail__root'>
      {/*<div className='shipmentDetail__map'></div>*/}
      <div className='shipmentDetail__content'>
        <div className='shipmentDetail__left'>
          <div className='shipmentDetail__left_title'>
            <div className='root_title'>{shipment.title}</div>
            <div className='description_text'  style={{marginTop: 5}}>Shipment description</div>
          </div>

          <div className='shipmentDetail__left_sender'>
            <div className='shipmentDetail__left_senderSubtitle root_subtitle'>Sender</div>
            <div className='description_text' style={{marginTop: 15}}>Where the carrier should pick up the goods</div>
            <div className='shipmentDetail__left_senderLocationContainer'>
              <Pin/>
              <div className='label_text' style={{marginLeft: 10}}>{shipment.from}</div>
            </div>
            <div className='description_text' style={{marginTop: 35}}>Date</div>
            <div className='shipmentDetail__left_dateContainer'>
              <Calendar/>
              <div className='shipmentDetail__left_dateText date_font'>{shipment.departureDate}</div>
            </div>
          </div>

          <div className='shipmentDetail__left_recipient'>
            <div className='shipmentDetail__left_senderSubtitle root_subtitle'>Recipient</div>
            <div className='description_text' style={{marginTop: 15}}>Recipient key</div>
            <div className='label_text' style={{marginTop: 15}}>{shipment.recipient}</div>
            <div className='description_text' style={{marginTop: 15}}>Where the carrier should deliver the goods</div>
            <div className='shipmentDetail__left_senderLocationContainer'>
              <Pin/>
              <div className='label_text' style={{marginLeft: 10}}>{shipment.to}</div>
            </div>
            <div className='description_text' style={{marginTop: 35}}>Date</div>
            <div className='shipmentDetail__left_dateContainer'>
              <Calendar/>
              <div className='shipmentDetail__left_dateText date_font'>{shipment.arrivalDate}</div>
            </div>
          </div>

          <div className='shipmentDetail__left_goods'>
            <div className='shipmentDetail__left_senderSubtitle root_subtitle'>Goods</div>
            <div className='description_text' style={{marginTop: 15}}>Name or id of the cargo</div>

            <div className='shipmentDetail__left_goodsCard'>
              <div className='description_text' style={{marginTop: 15}}>ID</div>
              <div className='label_text' style={{marginTop: 15}}>{good.id}</div>
              <div className='description_text' style={{marginTop: 15}}>Type</div>
              <div className='label_text' style={{marginTop: 15}}>{this.goodDescription(shipment)}</div>
            </div>
          </div>

        </div>
      </div>
    </div>
  }
}