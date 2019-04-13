import React from 'react'
import {inject, observer} from 'mobx-react'
import AppStore from '../store/AppStore'
import Shipments from '@components/Shipments'
import './styles.css'

interface IInjectedProps {
    appStore?: AppStore
}
@inject('appStore')
@observer
export default class App extends React.Component<IInjectedProps> {
    render(){
        const appStore =  this.props.appStore!
        return <div className='app_root'>
            {/*Hello World!*/}
            {/*{appStore.counter}*/}
            {/*<button onClick={()=> appStore.counter++}>+</button>*/}
            <Shipments/>
        </div>
    }
}