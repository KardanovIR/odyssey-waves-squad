import React from 'react'
import {inject, observer} from 'mobx-react'
import ShipmentsStore from '@src/store/ShipmentsStore'
import InputGroup from 'react-bootstrap/InputGroup'


interface IInjectedProps {
    shipmentsStore?: ShipmentsStore
}

@inject('shipmentsStore')
@observer
export default class OtherFilter extends React.Component<IInjectedProps, { open: boolean }> {
    state = {
        open: true,
    }
    render(){
        const shipmentsStore = this.props.shipmentsStore!;
        return <div>
            <div className='statusFilter__button'
                 onClick={() => this.setState({open: !this.state.open})}>Other
            </div>
            {this.state.open &&
            <div className='statusFilter__checkboxes'>
                <div>
                    <div>Departure date</div>
                </div>
                <div>
                    <div>Arrival date</div>
                </div>
            </div>
            }
        </div>
    }
}