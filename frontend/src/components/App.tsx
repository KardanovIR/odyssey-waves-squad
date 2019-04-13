import React from 'react'
import { inject, observer } from 'mobx-react'
import AppStore from '../store/AppStore'
import Shipments from '@components/Shipments'
import TopBar from './TopBar'
import './styles.css'
import AuthStore from '@src/store/AuthStore'
import Login from './Login'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import CreateShipment from '@components/CreateShipment'

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
        <Router>
          <div>
            <TopBar user={user} />

            <Route exact path='/' component={Shipments} />
            <Route exact path='/createShipment' component={CreateShipment} />
          </div>
        </Router>
        :
        <Login />
      }
    </div>
  }
}