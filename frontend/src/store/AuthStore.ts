import RootStore from '@store/RootStore'
import SubStore from './SubStore'
import { computed, action, runInAction, observable } from 'mobx'

export type UserType = 'Sender' | 'Carrier' | 'Insurer' | 'Receiver'

export interface User {
  type: UserType
  publicKey: string
  address: string
}

export default class AuthStore extends SubStore {

  @observable
  private _user?: User = undefined

  @computed
  public get currentUser(): User | undefined {
    return this._user
  }

  @action
  public async login(type: UserType): Promise<User> {
    const ps = await this.rootStore.keeperStore.publicState()
    runInAction(() => {
      this._user = { type, ...ps.account }
    })

    return this._user!
  }

  public async logout() {
    this._user = undefined
  }

  constructor(public rootStore: RootStore) {
    super(rootStore)
  }
}
