import SubStore from './SubStore'
import {action, computed, observable} from 'mobx'

export const statusLabelMap = {
  forming: 'Forming',
  formed: 'Formed',
  approved: 'Approved',
  onTheWay: 'On the way',
  damaged: 'Damage Claimed',
  done: 'Done',
}

export default class ShipmentsStore extends SubStore {
  @observable shipments: any[] = [{
    status: 'damaged',
    recipient: 'Roga i Kopita',
    sender: 'romashka',
    departureDate: '2019.01.01',
  },{
    status: 'approved',
    recipient: 'Interstellar LLC',
    sender: 'romashka',
    departureDate: '2019.05.01',
  }]


  @computed get visibleShipments(){
    return this.shipments.filter(shipment =>  this.statusFilters.All || this.statusFilters[shipment.status])
  }

  @observable statusFilters = {
    All: true,
    forming: true,
    formed: true,
    approved: true,
    onTheWay: true,
    damaged: true,
    done: true,
  }

  @observable departureFilter = {
    from: undefined,
    to: undefined,
  }

  @observable arrivalFilter = {
    from: undefined,
    to: undefined,
  }

}