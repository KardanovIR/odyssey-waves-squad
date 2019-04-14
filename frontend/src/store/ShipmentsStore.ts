import SubStore from './SubStore'
import { computed, observable, toJS, runInAction, autorun } from 'mobx'
import RootStore from '@store/RootStore'
import axios from 'axios'
import { setInterval } from 'timers'
import { SipmentStatus } from '@src/common/shipmentStatus'


const BASE_URL = 'http://backend.odyssey.wavesplatform.com:8080/api/'
export const statusLabelMap = {
  forming: 'Forming',
  transferring: 'Transferring',
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
  @observable shipments: IShipment[] = []
  
  


  @observable shipmentCreation: Partial<IShipment> = {
    id: '',
    title: 'First shipment',
    sender: this.rootStore.authStore.currentUser! && this.rootStore.authStore.currentUser!.publicKey,
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
    status: 'forming',
  }


  @observable statusFilters = {
    All: false,
    forming: true,
    // formed: true,
    transferring: true,
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

  constructor(rootStore: RootStore) {
    super(rootStore)

    autorun(() => this.shipmentCreation.sender = this.currentUser && this.currentUser.publicKey)
    this.syncInterval = setInterval(() => this.syncShipments(), 5000)
  }

  private async _updateShipment(shipment: IShipment) {
    await axios.post(BASE_URL + '/shipments', shipment)
  }

  @computed get visibleShipments() {
    return this.shipments.filter(shipment => this.statusFilters.All || this.statusFilters[shipment.status])
  }

  @computed get currentUser() {
    return this.rootStore.authStore.currentUser
  }

  async syncShipments() {
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

  async submitShipment() {
    console.log(toJS(this.shipmentCreation))
    await axios.post(BASE_URL + '/shipments', this.shipmentCreation)
    await this.syncShipments()
  }

  async transferShipment(shipment: IShipment, companyId: string) {
    shipment.carrier = companyId

    if (shipment.carrier === shipment.recipient) {
      shipment.status = 'done'
    } else if (shipment.claims.length > 0) {
      shipment.status = 'damaged'
    } else {
      shipment.status = 'onTheWay'
    }

    await this._updateShipment(shipment)
  }

  async approveShipment(shipment: IShipment) {
    shipment.status = 'approved'
    await this._updateShipment(shipment)
  }
}

