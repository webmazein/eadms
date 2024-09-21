import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))

const NewUser = React.lazy(() => import('./views/forms/new-user/NewUser'))
const Settings = React.lazy(() => import('./views/forms/settings/Settings'))
const RaiseDefects = React.lazy(() => import('./views/forms/raise-defects/RaiseDefects'))
const ManageUsers = React.lazy(() => import('./views/dashboard/ManageUsers'))
const ManageDefects = React.lazy(() => import('./views/dashboard/ManageDefects'))
const ZoneUI = React.lazy(() => import('./views/zone-UI/zone'))
const Reports = React.lazy(() => import('./views/reports/Reports'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/addNewUser', name: 'AddNewUser', element: NewUser },
  { path: '/settings', name: 'Settings', element: Settings },
  { path: '/raiseDefects', name: 'RaiseDefects', element: RaiseDefects },
  { path: '/zoneUI', name: 'ZoneUI', element: ZoneUI },
  { path: '/zoneUI/:id', name: 'ZoneUI', element: ZoneUI },
  { path: '/reports', name: 'Reports', element: Reports },
  { path: '/manageUsers', name: 'Users', element: ManageUsers },
  { path: '/manageDefects', name: 'Defects', element: ManageDefects },
]

export default routes
