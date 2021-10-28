import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as MdIcons from 'react-icons/md';
import * as IoIcons from 'react-icons/io';
import * as CgIcons from "react-icons/cg";

export const SidebarData = [
  {
    // title: 'Profile',
    path: '/profile',
    icon: <CgIcons.CgProfile style={{height:'150%', width:'150%', alignContent:'center'}}/> ,
    cName: 'nav-text'
  },
  {
    title: 'Completed',
    path: '/completed',
    icon: <IoIcons.IoIosPaper />,
    cName: 'nav-text'
  },
  {
    title: 'Settings',
    path: '/settings',
    icon: <MdIcons.MdOutlineSettings />,
    cName: 'nav-text'
  },
  {
    title: 'Logout',
    path: '/',
    icon: <MdIcons.MdPowerSettingsNew />,
    cName: 'nav-text'
  },

];