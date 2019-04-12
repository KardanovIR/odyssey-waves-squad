import SubStore from './SubStore'
import {action, observable} from 'mobx'

export default class ShipmentsStore extends SubStore {
    @observable shipments: any[] = [];

    @observable statusFilters = {
        'All': true,
        'Forming': true,
        'Formed': true,
        'Approved': true,
        'On the way': true,
        'Damage claimed': true,
        'Done': true,
    }

}