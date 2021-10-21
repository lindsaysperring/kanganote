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
      <div id="newnotesbutton">
        <button> <Icon size={25} icon={plus} /> New Notes </button>
      </div>
      <div id="dashboardmessage">
        <p>Get organised with your first Kanganote today by adding new notes!</p>
      </div>
    </div>
  )
}

export default Dashboard
