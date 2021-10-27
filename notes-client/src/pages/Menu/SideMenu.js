import React, {useContext, useState} from 'react';

import { userContext } from "../../Routing";

import './SideMenu.css'

const SideMenu = (props) => {
  const { userData } = useContext(userContext);


  return (
    <div className='start' style={{width: props.width}}>
          {userData.isLoggedIn && (
            <>
      <h1> Welcome {userData.user.name} </h1>
      <a href= '/profile'>Profile</a>
      <a href='/completed'>Completed Notes</a>
      <a href='/settings'>Settings</a>
      <a href='/'>Log Out</a>
      </>
      )}
    </div>
  )
}

export default SideMenu;