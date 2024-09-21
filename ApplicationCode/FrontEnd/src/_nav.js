
import { CNavGroup, CNavItem} from '@coreui/react'
import {
  cilAppsSettings,
  cilNotes,
  cilPencil,
  cilPlaylistAdd,
  cilSpeedometer
} from '@coreui/icons'

import CIcon from '@coreui/icons-react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    to: '/dashboard',
 
  },
  // {
  //   component: CNavItem,
  //   name: 'New User',
  //   to: '/addNewUser',

  // },
  {
    component: CNavItem,
    name: 'Settings',
    icon: <CIcon icon={cilAppsSettings} customClassName="nav-icon" />,
    to: '/settings',
  },
  {
    component: CNavItem,
    name: 'Raise Defect',
    icon: <CIcon icon={cilPlaylistAdd} customClassName="nav-icon" />,
    to: '/raiseDefects',
  },
  {
    component: CNavGroup,
    name: 'Manage',
    icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Users',
        to: '/manageUsers',
      },
      {
        component: CNavItem,
        name: 'Defects',
        to: '/manageDefects',
      },
    ],
  },
  // {
  //   component: CNavItem,
  //   name: 'Reports',
  //   to: '/reports',
  // },
  // {
  //   component: CNavItem,
  //   name: 'Zone',
  //   to: '/zoneUI',
  // },
]

export default _nav
