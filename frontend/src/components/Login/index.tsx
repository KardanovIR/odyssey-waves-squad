import React from 'react'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import './styles.css'
import StatusFilter from '@components/Shipments/StatusFilter'
import OtherFilter from '@components/Shipments/OtherFilter'
import { inject, observer } from 'mobx-react'
import Shipment from '@components/Shipments/Shipment'
import AuthStore, { UserType } from '@src/store/AuthStore'

@inject('authStore')
@observer
export default class Login extends React.Component<{ authStore?: AuthStore }> {

  render() {
    const authStore = this.props.authStore!

    const login = async (type: UserType) => {
      await authStore.login(type)
    }

    return <div className='login__card'>
      <div className='login__h1'>Login</div>
      <div className='login__sub'>
        Please login from Keeper to start using Shipment platform
      </div>
      <button className='login__button__sender' onClick={() => login('Sender')}>Sender</button>
      <button className='login__button__sender login__color__carrier' onClick={() => login('Carrier')}>Carrier</button>
      <button className='login__button__sender login__color__insuser' onClick={() => login('Insurer')}>Insurer</button>
      <button className='login__button__sender login__color__receiver' onClick={() => login('Receiver')}>Receiver</button>
    </div >
  }
}