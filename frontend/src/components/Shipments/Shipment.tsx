import * as React from 'react'
import More from '@src/icons/More'

interface IShipmentProps {
    shipment: any
}

export default class Shipment extends React.Component<IShipmentProps> {
    render(){
        const {shipment} = this.props
        const statusEl = {
            'Forming': <div className='Forming'>Forming</div>,
            'Formed': <div className='Formed'>Formed</div>,
            'Approved': <div className='Approved'>Approved</div>,
            'On the way': <div className='On-the-Way'>Forming</div>,
            'Damaged': <div className='Damaged'>Damaged</div>,
            'Done': <div className='Done'>Forming</div>,
        }[shipment.status];

        return <div className='shipment__root'>
            <div>
                <div className='shipment__fieldLabel'>Status</div>
                {statusEl}
            </div>
            <div>
                <div className='shipment__fieldLabel'>Recipient</div>
                <div className='shipment__field'>{shipment.recipient}</div>
            </div>
            <div>
                <div className='shipment__fieldLabel'>Departure date</div>
                <div className='shipment__field'>{shipment.departureDate}</div>
            </div>
            <div className='shipments__steps'>

            </div>
            <div>
                <div className='shipment__fieldLabel'>Arrival date</div>
                <div className='shipment__field'>{shipment.arrivalDate}</div>
            </div>
            <div>
                <More/>
            </div>
        </div>
    }
}