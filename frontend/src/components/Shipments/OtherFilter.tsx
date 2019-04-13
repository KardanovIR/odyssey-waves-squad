import React from 'react'
import { inject, observer } from 'mobx-react'
import ShipmentsStore from '@src/store/ShipmentsStore'
import InputGroup from 'react-bootstrap/InputGroup'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'


interface IInjectedProps {
  shipmentsStore?: ShipmentsStore
}

@inject('shipmentsStore')
@observer
export default class OtherFilter extends React.Component<IInjectedProps, { open: boolean }> {
  state = {
    open: true,
  }


  render() {
    const shipmentsStore = this.props.shipmentsStore!
    const { departureFilter, arrivalFilter } = shipmentsStore

    return <div style={{ marginTop: 10 }}>
      <div className='statusFilter__button'
        onClick={() => this.setState({ open: !this.state.open })}>Other
        <img src='assets/icons/up.svg' className={'statusFilter__button_icon_' + (this.state.open ? 'up' : 'down')}></img>
      </div>
      {this.state.open &&
        <div className='statusFilter__checkboxes' style={{ marginLeft: 0 }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div className='filters__date__label' style={{ fontSize: 14 }}>Departure date</div>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <div className='filters__date__label' style={{ marginRight: 10 }}>From</div>
              <DatePicker
                className='filters__datePicker'
                selected={departureFilter.from}
                selectsStart
                // startDate={this.state.startDate}
                // endDate={this.state.endDate}
                onChange={e => departureFilter.from = e as any}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <div className='filters__date__label' style={{ marginRight: 28 }}>To</div>

              <DatePicker
                className='filters__datePicker'
                selected={departureFilter.to}
                selectsEnd
                // startDate={this.state.startDate}
                // endDate={this.state.endDate}
                onChange={e => departureFilter.to = e as any}
              />
            </div>
          </div>
          <div>
            <div className='filters__date__label' style={{ fontSize: 14 }}>Arrival date</div>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <div className='filters__date__label' style={{ marginRight: 10 }}>From</div>
              <DatePicker
                className='filters__datePicker'
                selected={arrivalFilter.from}
                selectsStart
                // startDate={this.state.startDate}
                // endDate={this.state.endDate}
                onChange={e => arrivalFilter.from = e as any}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <div className='filters__date__label' style={{ marginRight: 28 }}>To</div>

              <DatePicker
                className='filters__datePicker'
                selected={arrivalFilter.to}
                selectsEnd
                // startDate={this.state.startDate}
                // endDate={this.state.endDate}
                onChange={e => arrivalFilter.to = e as any}
              />
            </div>
          </div>
        </div>
      }
    </div>
  }
}