import React from 'react'
import {Outlet , Navigate} from 'react-router-dom'

function AdminProtectedRoute() {
    const token = localStorage.getItem('accessToken')
    const role = localStorage.getItem('loggedUserRole')
    console.log(role);
  return (
    token && role === 'admin' ? <Outlet/> : <Navigate to={'/login'}/>
  )
}

export default AdminProtectedRoute