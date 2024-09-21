import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {
  CCloseButton,
  CHeaderText,
  CNavGroup,
  CNavItem,
  CSidebar,
  CSidebarBrand,
  CSidebarFooter,
  CSidebarHeader,
  CSidebarToggler,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

import { AppSidebarNav } from './AppSidebarNav'

import { logo } from 'src/assets/brand/logo'
import { sygnet } from 'src/assets/brand/sygnet'

// sidebar nav config
import navigation from '../_nav'
import { cilAppsSettings, cilNotes, cilPlaylistAdd } from '@coreui/icons'

const AppSidebar = () => {
  const dispatch = useDispatch()
  const unfoldable = useSelector((state) => state.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state.ui.sidebarShow)
  const user = useSelector((state) => state.auth.user)
  const supervisorNav = [

  {
    component: CNavItem,
    name: 'Raise Defect',
    icon: <CIcon icon={cilPlaylistAdd} customClassName="nav-icon" />,
    to: '/raiseDefects',
  },
    {
    component: CNavItem,
    name: 'Settings',
    icon: <CIcon icon={cilAppsSettings} customClassName="nav-icon" />,
    to: '/settings',
  },

  {
    component: CNavGroup,
    name: 'Manage',
    icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Defects',
        to: '/manageDefects',
      },
    ],
  }
]

  return (
    <CSidebar
      className="border-end"
      colorScheme="dark"
      position="fixed"
      // unfoldable={unfoldable}
      visible={user.role === 'user' ? false : sidebarShow}
      onVisibleChange={(visible) => {
        dispatch({ type: 'set', sidebarShow: visible })
      }}
    >
      <CSidebarHeader className="border-bottom">
              <img
            src={'/tnd_logo_white.jpg'} 
            alt="The New Dimensionz"
            style={{ width: '150px' }}
          />
        <CCloseButton
          className="d-lg-none"
          dark
          onClick={() => dispatch({ type: 'set', sidebarShow: false })}
        />
      </CSidebarHeader>
      <AppSidebarNav items={user.role === "supervisor" ? supervisorNav : navigation} />
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
