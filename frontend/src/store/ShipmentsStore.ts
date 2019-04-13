import SubStore from './SubStore'
import {computed, observable, toJS, runInAction} from 'mobx'
import RootStore from '@store/RootStore'
import axios from 'axios'
import {setInterval} from 'timers'
import { SipmentStatus } from '@src/common/shipmentStatus'


const BASE_URL = 'http://backend.odyssey.wavesplatform.com:8080/api/'
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
  description: string
}




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
  device: string
  from: string
  to: string
  conditionMin?: string
  conditionMax?: string
  conditionType: 'fragile' | 'temperature sensitive' | 'humidity sensitive' | 'basic'
  departureDate: string
  arrivalDate: string
  policyId?: string
  carrier: string
  goods: IGood[]
  claims: IClaim[]
  extraInfo: IExtraInfo[]
  status: SipmentStatus,
}

export default class ShipmentsStore extends SubStore {
  @observable shipments: IShipment[] = [{
    id: '2PxysbRPFLtrgwGqVVAhVnUesrydfuAUvJwZ3HXXuTTpSe',
    title: 'First shipment',
    sender: 'romashka',
    recipient: 'Roga i Kopita',
    from: 'Canada',
    to: 'Russia',
    device: '9838866f-44b4-4b37-8b83-c1e09a456967',
    departureDate: '2019.01.01',
    arrivalDate: '2019.01.07',
    policyId: undefined,
    conditionMin: '-15',
    conditionMax: '-5',
    conditionType: 'temperature sensitive',
    carrier: 'Example carrier',
    goods: [{
      id: 'IjnasdoUAHMSdqklwN<ASANDukq',
      description: 'basic description',
    }],
    claims: [],
    extraInfo: [],
    status: 'damaged',
  }, {
    id: '2PxysbRPFLtrgwGqVVAhVnUesrydfuAUvJwZ3HXXuTTpSa',
    title: 'First shipment',
    sender: 'romashka 2',
    device: '9838866f-44b4-4b37-8b83-c1e09a456967',
    recipient: 'Roga i Kopita 2',
    from: 'Canada',
    to: 'Russia',
    conditionType: 'temperature sensitive',
    conditionMin: '-15',
    conditionMax: '-5',
    departureDate: '2019.01.08',
    arrivalDate: '2019.01.07',
    policyId: undefined,
    carrier: 'Example carrier',
    goods: [{
      id: 'test item',
      description: 'some item',
    }],
    claims: [],
    extraInfo: [],
    status: 'approved',
  }]


  @observable shipmentCreation: Partial<IShipment> = {
    id: '',
    title: 'First shipment',
    sender: this.rootStore.authStore.currentUser!.publicKey,
    device: '9838866f-44b4-4b37-8b83-c1e09a456967',
    recipient: 'Roga i Kopita 2',
    from: 'Canada',
    to: 'Russia',
    departureDate: '2019.01.08',
    arrivalDate: '2019.01.08',
    conditionType: 'basic',
    conditionMin: '',
    conditionMax: '',
    policyId: undefined,
    carrier: 'Example carrier',
    goods: [{
      id: '',
      description: 'basic description',
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

  private syncInterval?: any

  constructor(rootStore: RootStore){
    super(rootStore)

    this.syncInterval = setInterval(() => this.syncShipments(), 5000)
  }

  @computed get visibleShipments() {
    return this.shipments.filter(shipment => this.statusFilters.All || this.statusFilters[shipment.status])
  }

  @computed get currentUser(){
    return this.rootStore.authStore.currentUser
  }

  async syncShipments(){
    const userTypeMap = {
      'Receiver': 'recived',
      'Sender': 'send',
      'Carrier': 'carier',
    }
    const user = this.currentUser
    if (!user) return
    const resp = await axios.get(BASE_URL + `/shipments/${userTypeMap[user.type]}/${user.publicKey}`)
    console.log(resp.data.data)
    runInAction(() => this.shipments = resp.data.data.map(shipment => observable(shipment)))
  }

  async submitShipment(){
    console.log(toJS(this.shipmentCreation))
    await axios.post(BASE_URL +'/shipments', this.shipmentCreation)
    await this.syncShipments()
  }
}

