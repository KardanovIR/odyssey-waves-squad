import React from 'react'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import './styles.css'
import StatusFilter from '@components/Shipments/StatusFilter'
import OtherFilter from '@components/Shipments/OtherFilter'

export default class Shipments extends React.Component {

    render(){
        return <div className='shipments__root'>
            <div className='shipments__left'>
                <StatusFilter/>
                <OtherFilter/>
            </div>
            <div className='shipments__right'></div>
        </div>
    }
}