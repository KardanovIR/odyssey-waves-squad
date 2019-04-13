import SubStore from './SubStore'
import {action, computed, observable, reaction} from 'mobx'
import RootStore from '@store/RootStore'

export const statusLabelMap = {
  forming: 'Forming',
  formed: 'Formed',
  approved: 'Approved',
  onTheWay: 'On the way',
  damaged: 'Damage Claimed',
  done: 'Done',
}

export interface IGood {
  id: string
  type: 'fragile' | 'temperature sensitive' | 'humidity sensitive' | 'basic'
  description: string
}

export interface ITSensitiveGood extends IGood{
  type: 'temperature sensitive'
  tFrom: string
  tTo: string
}

export interface IHSensitiveGood extends IGood{
  type: 'humidity sensitive'
  hFrom: string
  hTo: string
}

export interface IFragileGood extends IGood{
  type: 'fragile'
}

export interface IBasicGood extends IGood{
  type: 'basic'
}

export type TGood = IHSensitiveGood | ITSensitiveGood | IFragileGood | IBasicGood

export interface ILocation {
  longitude: string,
  latitude: string,
}
export interface IClaim {
  id: string,
  description: string,
  location: ILocation,
  createDate: string,
  creater: string
}

export interface IExtraInfo {
  id: string
  description: string
  location: ILocation
  createData: string
  creater: string
}

export interface IShipment {
  id: string
  title: string
  sender: string
  recipient: string
  from: string
  to: string
  departureDate: string
  arrivalDate: string
  policyId?: string
  carrier: string
  goods: TGood[]
  claims: IClaim[]
  extraInfo: IExtraInfo[]
  status: string,

}

export default class ShipmentsStore extends SubStore {
  @observable shipments: IShipment[] = [{
    id: '2PxysbRPFLtrgwGqVVAhVnUesrydfuAUvJwZ3HXXuTTpSe',
    title: 'First shipment',
    sender: 'romashka',
    recipient: 'Roga i Kopita',
    from: 'Canada',
    to: 'Russia',
    departureDate: '2019.01.01',
    arrivalDate: '2019.01.07',
    policyId: undefined,
    carrier: 'Example carrier',
    goods: [{
      id: 'IjnasdoUAHMSdqklwN<ASANDukq',
      description: 'basic description',
      type: 'temperature sensitive',
      tFrom: '-15',
      tTo: '-5',
    }],
    claims: [],
    extraInfo: [],
    status: 'damaged',
  }, {
    id: '2PxysbRPFLtrgwGqVVAhVnUesrydfuAUvJwZ3HXXuTTpSa',
    title: 'First shipment',
    sender: 'romashka 2',
    recipient: 'Roga i Kopita 2',
    from: 'Canada',
    to: 'Russia',
    departureDate: '2019.01.08',
    arrivalDate: '2019.01.07',
    policyId: undefined,
    carrier: 'Example carrier',
    goods: [{
      id: 'test item',
      description: 'some item',
      type: 'temperature sensitive',
      tFrom: '-15',
      tTo: '-5',
    }],
    claims: [],
    extraInfo: [],
    status: 'approved',
  }]


  @observable shipmentCreation: Partial<IShipment> = {
    id: '',
    title: 'First shipment',
    sender: 'romashka 2',
    recipient: 'Roga i Kopita 2',
    from: 'Canada',
    to: 'Russia',
    departureDate: '2019.01.08',
    arrivalDate: '2019.01.08',
    policyId: undefined,
    carrier: 'Example carrier',
    goods: [{
      id: '',
      description: 'basic description',
      type: 'basic',
    }],
    claims: [],
    extraInfo: [],
    status: 'approved',
  }


  @observable statusFilters = {
    All: false,
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

  @computed get visibleShipments() {
    return this.shipments.filter(shipment => this.statusFilters.All || this.statusFilters[shipment.status])
  }


  async submitShipment(){
    console.log('shipment sumbmit method')
  }
}