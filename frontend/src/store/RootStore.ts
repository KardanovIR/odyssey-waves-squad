import AppStore from './AppStore'
import KeeperStore from './KeeperStore'
import AuthStore from './AuthStore'

export default class RootStore {
  public appStore: AppStore
  public keeperStore: KeeperStore
  public authStore: AuthStore

  constructor() {
    this.appStore = new AppStore(this)
    this.keeperStore = new KeeperStore(this)
    this.authStore = new AuthStore(this)
  }
}

