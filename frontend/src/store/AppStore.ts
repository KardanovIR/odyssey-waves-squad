import RootStore from './RootStore'
import { observable } from 'mobx'
import SubStore from './SubStore'

export default class AppStore extends SubStore {
  @observable counter = 0

  constructor(rootStore: RootStore) {
    super(rootStore)
  }

}