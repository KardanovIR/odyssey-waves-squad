import RootStore from '@store/RootStore'
import SubStore from './SubStore'
import { computed, action, runInAction, observable } from 'mobx'

export type UserType = 'Sender' | 'Carrier' | 'Insurer' | 'Receiver'

export interface User {
  type: UserType
  publicKey: string
  address: string
}

export interface AuthData {
  user: User
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
      this._user = { ...ps.account, type }
    })

    this._save()

    return this._user!
  }

  public async logout() {
    this._user = undefined
    this._save()
  }

  private _load() {
    let data: AuthData | undefined = undefined
    try {
      data = JSON.parse(localStorage.getItem('AuthStore')!)
    } catch (error) { }

    if (data)
      this._user = data.user
  }

  private _save() {
    localStorage.setItem('AuthStore', JSON.stringify({ user: this._user }))
  }

  constructor(public rootStore: RootStore) {
    super(rootStore)
    this._load()
  }
}
