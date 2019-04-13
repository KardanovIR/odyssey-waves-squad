import * as React from 'react'
import { inject, observer } from 'mobx-react'
import ShipmentsStore from '@src/store/ShipmentsStore'
import InputGroup from 'react-bootstrap/InputGroup'
import { statusLabelMap } from '@src/store/ShipmentsStore'

interface IInjectedProps {
  shipmentsStore?: ShipmentsStore
}

@inject('shipmentsStore')
@observer
export default class StatusFilter extends React.Component<IInjectedProps, { open: boolean }> {
  state = {
    open: true,
  }

  render() {
    const shipmentsStore = this.props.shipmentsStore!

    return <div>
      <div className='statusFilter__button'
        onClick={() => this.setState({ ...this.state, open: !this.state.open })}>Status
        <img src='assets/icons/up.svg' className={'statusFilter__button_icon_' + (this.state.open ? 'up' : 'down')}></img>
        {/* <img src='assets/icons/up.svg' className='statusFilter__button_icon_down'></img> */}
      </div>
      {this.state.open &&
        <div className='statusFilter__checkboxes'>
          {Object.entries(shipmentsStore.statusFilters).map(([filterKey, val]) => <InputGroup.Prepend key={filterKey}>
            <InputGroup.Checkbox
              checked={val}
              onChange={() => shipmentsStore.statusFilters[filterKey] = !val}
              className='statusFilter__checkbox'
            />
            <div className='statusFilter__checkbox_label'>{statusLabelMap[filterKey] || 'All'}</div>
          </InputGroup.Prepend>)}
          {/*{filters.map(filterTitle => <InputGroup.Prepend key={filterTitle}>*/}
          {/*<InputGroup.Checkbox*/}
          {/*checked={shipmentsStore.statusFilters[filterTitle]}*/}
          {/*onChange={() => shipmentsStore.statusFilters[filterTitle] = !shipmentsStore.statusFilters[filterTitle]}*/}
          {/*/>*/}
          {/*<div className='statusFilter__checkbox_label'>{filterTitle}</div>*/}
          {/*</InputGroup.Prepend>)}*/}
        </div>
      }
    </div>
  }
}