import React from 'react'
import { inject, observer } from 'mobx-react'
import AppStore from '../store/AppStore'
import Shipments from '@components/Shipments'
import TopBar from './TopBar'
import './styles.css'
import AuthStore from '@src/store/AuthStore'
import Login from './Login'

interface IInjectedProps {
  appStore?: AppStore
  authStore?: AuthStore
}

@inject('appStore', 'authStore')
@observer
export default class App extends React.Component<IInjectedProps> {
  render() {

    const authStore = this.props.authStore!
    const user = authStore.currentUser

    console.log(user)
    return <div className='app_root'>

      {user ?
        <><TopBar user={user} />
          <Shipments /></>
        :
        <Login />
      }
    </div>
  }
}