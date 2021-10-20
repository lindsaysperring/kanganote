import React from 'react'

import './Dashboard.css'

import logo from '../images/Logo.png'

import { Icon } from 'react-icons-kit'
import { plus } from 'react-icons-kit/metrize/plus'


const Dashboard = () => {
  return (
    <div>
      <div>
        <img src={logo}/>
      </div>
      <div>
        <button> <Icon size={25} icon={plus} /> New Notes </button>
      </div>
    </div>
  )
}

export default Dashboard
