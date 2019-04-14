import * as React from 'react'
import './styles.css'
import { observer, inject } from 'mobx-react'
import AuthStore, { User } from '@src/store/AuthStore'
import { withRouter } from 'react-router-dom'
import Logout from '@src/icons/Logout'

const trim = (str: string, len: number) => {
  return str.substr(0, len) + '...'
}

@withRouter
@inject('authStore')
@observer
export default class TopBar extends React.Component<{ authStore?: AuthStore, user: User, history?: any }> {
  render() {
    const user = this.props.user
    const authStore = this.props.authStore!
    return (<div className='topBar__root'>
      <div className='topBar__logo' onClick={() => this.props.history.push('/')}>Odyssey</div>
      <div className='topBar__user__card'>
        <div>
          <div className='topBar__userType'>{user.type}</div>
          <div className='topBar__userKey'>{trim(user.publicKey, 30)}</div>
        </div>
        <Logout className='topBar__icon__logout' onClick={() => { authStore.logout() }}/>
      </div>

    </div>)
  }
}
