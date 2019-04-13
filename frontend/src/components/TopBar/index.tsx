import * as React from 'react'
import './styles.css'

const topBar = ({user}) => (<div className='topBar__root'>
  <div className='topBar__logo'>Odyssey</div>
  <div className='topBar__user'>{user.publicKey}</div>
</div>)

export default topBar