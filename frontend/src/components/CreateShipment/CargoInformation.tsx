import * as React from 'react'
import {inject, observer} from 'mobx-react'
import ShipmentsStore from '@store/ShipmentsStore'
import DatePicker from 'react-datepicker'
import {observable} from 'mobx'
import {Dropdown} from 'react-bootstrap'

@inject('shipmentsStore')
@observer
export default class CargoInformation extends React.Component<{ shipmentsStore?: ShipmentsStore, onContinue: () => void }> {
  render() {
    const shipmentCreation = this.props.shipmentsStore!.shipmentCreation
    const good = shipmentCreation.goods![0]
    if (good == null) {
      shipmentCreation.goods!.push(observable({
        id: '',
        description: '',
        type: 'basic',
      }))
    }

    return <div className='createShipment__basicInfo'>
      <div className='createShipment__basicInfo_text'>Cargo Information</div>
      <div className='createShipment__basicInfo_textDescription'>Carefully fill in all the fields to create a
        transportation
      </div>
      <div className='load__root'>
        <div className='sender__text'>Specify the load</div>
        <div className='sender__textDescription'>Specify the name the cargo</div>
        <input className='location_input'
               value={good.description}
               onChange={(e) => good.description = e.target.value}
        />
        <div className='sender__textDescription'>Type</div>
        <Dropdown>
          <Dropdown.Toggle className='createShipment__cargotype_btn' id='dropdown-basic'>
            {{
              basic: 'Basic',
              'fragile': 'Fragile',
              'temperature sensitive': 'Temperature sensitive',
              'humidity sensitive': 'Humidity sensitive',
            }[good.type]}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => good.type = 'basic'}>Basic</Dropdown.Item>
            <Dropdown.Item onClick={() => good.type = 'fragile'}>Fragile</Dropdown.Item>
            <Dropdown.Item onClick={() => good.type = 'temperature sensitive'}>Temperature sensitive</Dropdown.Item>
            <Dropdown.Item onClick={() => good.type = 'humidity sensitive'}>Humidity sensitive</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        {good.type === 'temperature sensitive' &&
        <FromTo fromValue={good.tFrom} toValue={good.tTo}
                onFromChange={(val) => good.tFrom = val}
                onToChange={(val) => good.tTo = val}
        />}
      </div>
      <div className='createShipment__basicInfo_continue' onClick={this.props.onContinue}>Continue</div>
    </div>
  }
}

const FromTo = ({fromValue, toValue, onFromChange, onToChange}) => (<div className='createShipment__from_to_container'>
    <div>
      <div className='sender__textDescription'>From</div>
      <input className='createShipment__fromTo_input'
             value={fromValue}
             onChange={(e) => onFromChange(e.target.value)}
      />
    </div>
    <div>
      <div className='sender__textDescription'>To</div>
      <input className='createShipment__fromTo_input'
             value={toValue}
             onChange={(e) => onToChange(e.target.value)}
      />
    </div>
  </div>
)