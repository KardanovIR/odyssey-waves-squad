import AppStore from './AppStore'
import KeeperStore from './KeeperStore'
import ShipmentsStore from './ShipmentsStore'

export default class RootStore {
  public appStore: AppStore
  public keeperStore: KeeperStore
  public shipmentsStore: ShipmentsStore

  constructor() {
    this.appStore = new AppStore(this)
    this.keeperStore = new KeeperStore(this)
    this.shipmentsStore = new ShipmentsStore(this)
  }
}

