import AppStore from './AppStore'

export default class RootStore {
    public appStore: AppStore

    constructor(){
        this.appStore = new AppStore(this)
    }
}

