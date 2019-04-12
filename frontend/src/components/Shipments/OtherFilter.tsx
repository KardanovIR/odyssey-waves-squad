import React from 'react'
import {inject, observer} from 'mobx-react'
import ShipmentsStore from '@src/store/ShipmentsStore'
import InputGroup from 'react-bootstrap/InputGroup'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'


interface IInjectedProps {
    shipmentsStore?: ShipmentsStore
}

@inject('shipmentsStore')
@observer
export default class OtherFilter extends React.Component<IInjectedProps, { open: boolean }> {
    state = {
        open: true,
    };


    render(){
        const shipmentsStore = this.props.shipmentsStore!
        const {departureFilter, arrivalFilter} =  shipmentsStore

        return <div>
            <div className='statusFilter__button'
                 onClick={() => this.setState({open: !this.state.open})}>Other
            </div>
            {this.state.open &&
            <div className='statusFilter__checkboxes'>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <div>Departure date</div>
                    <div  style={{display: 'flex', flexDirection: 'row'}}>
                        <div>From</div>
                        <DatePicker
                            selected={departureFilter.from}
                            selectsStart
                            // startDate={this.state.startDate}
                            // endDate={this.state.endDate}
                            onChange={e => departureFilter.from = e as any}
                        />
                    </div>
                    <div  style={{display: 'flex', flexDirection: 'row'}}>
                        <div>To</div>

                        <DatePicker
                            selected={departureFilter.to}
                            selectsEnd
                            // startDate={this.state.startDate}
                            // endDate={this.state.endDate}
                            onChange={e => departureFilter.to = e as any}
                        />
                    </div>
                </div>
                <div>
                    <div>Arrival date</div>
                    <div  style={{display: 'flex', flexDirection: 'row'}}>
                        <div>From</div>
                        <DatePicker
                            selected={arrivalFilter.from}
                            selectsStart
                            // startDate={this.state.startDate}
                            // endDate={this.state.endDate}
                            onChange={e => arrivalFilter.from = e as any}
                        />
                    </div>
                    <div  style={{display: 'flex', flexDirection: 'row'}}>
                        <div>To</div>

                        <DatePicker
                            selected={arrivalFilter.to}
                            selectsEnd
                            // startDate={this.state.startDate}
                            // endDate={this.state.endDate}
                            onChange={e => arrivalFilter.to =e as any}
                        />
                    </div>
                </div>
            </div>
            }
        </div>
    }
}