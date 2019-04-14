import * as React from 'react'
import './styles.css'
import BasicInfo from '@components/CreateShipment/BasicInfo'
import CargoInformation from '@components/CreateShipment/CargoInformation'
import Steps from '@components/Steps'
import Confirmation from './Confirmation'
import {inject} from 'mobx-react'
import {withRouter, RouteComponentProps} from 'react-router-dom'


@withRouter
@inject('shipmentsStore')
export default class CreateShipment extends React.Component<any, { step: number }> {
  state = {
    step: 0,
  }

  handleFinish = () => {
    this.props.history.push('/')
    this.props.shipmentsStore.submitShipment();
  }

  render() {
    const { step } = this.state

    return (
      <div className='createShipment__root'>
        <div className='createShipment__steps'>
          <div className='createShipment__steps_text' style={{ marginBottom: 20 }}>Create Shipment</div>
          {/* <div className='createShipment__steps_textDescription'>Create shipment text description</div> */}
          <Steps activeStep={step} />
        </div>
        <div className='createShipment__rightContainer'>
          {{
            0: <BasicInfo onContinue={() => this.setState({ step: 1 })} />,
            1: <CargoInformation onContinue={this.handleFinish} />,
            // 2: <Confirmation onContinue={this.handleFinish} />,
          }[step]}
        </div>
      </div>
    )
  }
}