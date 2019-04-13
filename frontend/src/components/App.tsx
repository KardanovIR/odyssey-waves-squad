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
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core'
import ShipmentDetail from './ShipmentDetail'

interface IInjectedProps {
  appStore?: AppStore
  authStore?: AuthStore
}

const colors = createMuiTheme({
  palette: {
    primary: { // works
      main: '#1f5af6',
      contrastText: '#fff',
    },
    secondary: { // works
      main: '#1f5af6',
      contrastText: '#fff',
    },
  },
})

@inject('appStore', 'authStore')
@observer
export default class App extends React.Component<IInjectedProps> {
  render() {

    const authStore = this.props.authStore!
    const user = authStore.currentUser

    console.log(user)
    return <div className='app_root'>

      <MuiThemeProvider theme={colors}>
        {user ?
          <Router>
            <>
              <TopBar user={user} />

              <Route exact path='/' component={Shipments} />
              <Route exact path='/createShipment' component={CreateShipment} />
              <Route exact path='/shipment/:id' component={ShipmentDetail} />
            </>
          </Router>
          :
          <Login />
        }
      </MuiThemeProvider>
    </div>
  }
}