import RootStore from '@store/RootStore'
import SubStore from './SubStore'
import { base58encode } from '@waves/waves-crypto'

declare global {
  interface Window {
    WavesKeeper: any
  }
}

export interface IKeeperAuth {
  address: string
  data: string
  host: string
  prefix: 'WavesWalletAuthentication'
  publicKey: string
  signature: string
}

export interface IKeeperPublicState {
  initialized: boolean
  locked: boolean
  account: Account
  network: Network
  messages: Message[]
  txVersion: { [key: string]: number[] }
}

export interface Account {
  name: string
  publicKey: string
  address: string
  networkCode: string
  network: string
  type: string
  balance: Balance
}

export interface Balance {
  available: string
  leasedOut: string
  network: string
}

export interface Message {
  id: string
  status: string
}

export interface Network {
  code: string
  server: string
  matcher: string
}

type Binary = Uint8Array | Buffer
export type ArgTypes = string | Binary | boolean | number
export interface IKeyValuePair {
  key: string,
  value: ArgTypes,
}

export default class KeeperStore extends SubStore {

  private convertArg(arg: ArgTypes) {
    if (typeof arg === 'number')
      return { type: 'integer', value: arg }

    if (typeof arg === 'string')
      return { type: 'string', value: arg }

    if (typeof arg === 'boolean')
      return { type: 'boolean', value: arg }

    return { type: 'binary', value: 'base64:' + Buffer.from(arg).toString('base64') }
  }

  async publicState(): Promise<IKeeperPublicState> {
    if (!this.isKeeperAwailable) throw new Error('Keeper is not installed')

    const api = await window.WavesKeeper.initialPromise
    return await api.publicState()
  }

  private _prepareInvoke(dappAddress: string, functionName: string, ...args: ArgTypes[]) {
    const payload = {
      type: 16,
      data: {
        fee: {
          'tokens': '0.05',
          'assetId': 'WAVES',
        },
        dappAddress,
        call: {
          function: functionName,
          args: args.map(this.convertArg),
        },
        payment: [],
      },
    }

    return payload
  }

  private _prepareInvokeWithPayment(dappAddress: string, functionName: string, payment: number, ...args: ArgTypes[]) {
    return { ...this._prepareInvoke(dappAddress, functionName, ...args), payment: [{ assetId: 'WAVES', tokens: payment }] }
  }

  async invoke(dappAddress: string, functionName: string, ...args: ArgTypes[]) {
    await window.WavesKeeper.signAndPublishTransaction(this._prepareInvoke(dappAddress, functionName, ...args))
  }

  async invokeWithPayment(dappAddress: string, functionName: string, payment: number, ...args: ArgTypes[]) {
    await window.WavesKeeper.signAndPublishTransaction(this._prepareInvokeWithPayment(dappAddress, functionName, payment, ...args))
  }

  async setData(...keyValuePairs: IKeyValuePair[]) {
    await window.WavesKeeper.signAndPublishTransaction({
      type: 12,
      data: {
        data: keyValuePairs.map(x => ({ ...this.convertArg(x.value), key: x.key })),
        fee: {
          'tokens': '0.01',
          'assetId': 'WAVES',
        },
      },
    })
  }

  async sendWaves(tokens: number, recipient: string): Promise<any> {
    await window.WavesKeeper.signAndPublishTransaction({
      type: 4,
      data: {
        amount: { tokens: tokens.toString(), assetId: 'WAVES' },
        fee: { tokens: '0.001', assetId: 'WAVES' },
        recipient,
      },
    })
  }

  get isKeeperAwailable(): boolean {
    return window.WavesKeeper !== undefined
  }

  constructor(public rootStore: RootStore) {
    super(rootStore)
  }
}
