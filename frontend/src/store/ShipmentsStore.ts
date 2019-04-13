import SubStore from './SubStore'
import {action, observable} from 'mobx'

export default class ShipmentsStore extends SubStore {
    @observable shipments: any[] = [{
        status: 'Formed',
        recipient: 'Roga i Kopita',
        sender: 'romashka',
        departureDate: '2019.01.01',

    }]


    @observable statusFilters = {
        'All': true,
        'Forming': true,
        'Formed': true,
        'Approved': true,
        'On the way': true,
        'Damage claimed': true,
        'Done': true,
    }

    @observable departureFilter = {
        from: undefined,
        to: undefined,
    }

    @observable arrivalFilter = {
        from: undefined,
        to: undefined,
    }

}