import React from 'react'
import {inject, observer} from 'mobx-react'
import AppStore from '../store/AppStore'


interface IInjectedProps {
    appStore?: AppStore
}
@inject('appStore')
@observer
export default class App extends React.Component<IInjectedProps> {
    render(){
        const appStore =  this.props.appStore!
        return <div>
            Hello World!
            {appStore.counter}
            <button onClick={()=> appStore.counter++}>+</button>
        </div>
    }
}