import AppStore from './AppStore'
import ShipmentsStore from './ShipmentsStore'

export default class RootStore {
    public appStore: AppStore
    public shipmentsStore: ShipmentsStore

    constructor() {
        this.appStore = new AppStore(this)
        this.shipmentsStore = new ShipmentsStore(this)
    }
}

