import * as React from 'react'
import {inject, observer} from 'mobx-react'
import ShipmentsStore from '@src/store/ShipmentsStore'
import InputGroup from 'react-bootstrap/InputGroup'
import {statusLabelMap} from '@src/store/ShipmentsStore'

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

    const filters = [
      'All',
      'Forming',
      'Formed',
      'Approved',
      'On the way',
      'Damage claimed',
      'Done',]

    return <div>
      <div className='statusFilter__button'
           onClick={() => this.setState({open: !this.state.open})}>Status
      </div>
      {this.state.open &&
      <div className='statusFilter__checkboxes'>
        {Object.entries(shipmentsStore.statusFilters).map(([filterTitle, val]) => <InputGroup.Prepend key={filterTitle}>
          <InputGroup.Checkbox
            checked={val}
            onChange={() => shipmentsStore.statusFilters[filterTitle] = !val}
          />
          <div className='statusFilter__checkbox_label'>{filterTitle}</div>
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