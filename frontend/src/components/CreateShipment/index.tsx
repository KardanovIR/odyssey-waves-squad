import * as React from 'react'
import './styles.css'
import BasicInfo from '@components/CreateShipment/BasicInfo'

export default class CreateShipment extends React.Component<any, { step: number }> {
  state = {
    step: 0,
  }

  render() {
    const { step } = this.state

    return (
      <div className='createShipment__root'>
        <div className='createShipment__steps'>
          <div className='createShipment__steps_text'>Create Shipment</div>
          <div className='createShipment__steps_textDescription'>Create shipment text description</div>
        </div>
        <div className='createShipment__rightContainer'>
          {{
            0: <BasicInfo onContinue={()=>this.setState({step: 1}) }/>,
            1: <div className='createShipment__cargoInformation'>

            </div>,
            2: <div className='createShipment__confirmation'>

            </div>,
          }[step]}
        </div>
      </div>
    )
  }
}