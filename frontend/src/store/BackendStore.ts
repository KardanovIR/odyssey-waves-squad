import RootStore from '@store/RootStore'
import SubStore from './SubStore'

export default class BackendStore extends SubStore {

  public async getShipments(param: string): Promise<any> {
    //const ps = await this.rootStore.keeperStore.publicState()
    //return this._user!
  }


  constructor(public rootStore: RootStore) {
    super(rootStore)
  }
}
