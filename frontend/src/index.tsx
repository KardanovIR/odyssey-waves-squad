import React from 'react'
import App from './components/App'
import {render} from 'react-dom'
import {Provider} from 'mobx-react'
import RootStore from './store/RootStore'
import './styles.css'

const store = new RootStore()

render(
    <Provider {...store}>
        <App/>
    </Provider>,
    document.getElementById('container')
)
