import AppStore from './AppStore'
import KeeperStore from './KeeperStore'

export default class RootStore {
  public appStore: AppStore
  public keeperStore: KeeperStore

  constructor() {
    this.appStore = new AppStore(this)
    this.keeperStore = new KeeperStore(this)
  }
}

