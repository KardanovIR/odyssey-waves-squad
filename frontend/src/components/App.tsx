import React from 'react'
import {inject, observer} from 'mobx-react'
import AppStore from '../store/AppStore'
import Shipments from '@components/Shipments'
import TopBar from './TopBar'
import './styles.css'

interface IInjectedProps {
  appStore?: AppStore
}

@inject('appStore')
@observer
export default class App extends React.Component<IInjectedProps> {
  render() {
    const logged = true;
    const user = {
      publicKey: 'abracadabra',
      type: 'carrier',
    }
    const appStore = this.props.appStore!
    return <div className='app_root'>
      {user ?
        <><TopBar user={user}/>
          <Shipments/></>
        :
        <div>Login</div>
      }
      {/*Hello World!*/}
      {/*{appStore.counter}*/}
      {/*<button onClick={()=> appStore.counter++}>+</button>*/}

    </div>
  }
}