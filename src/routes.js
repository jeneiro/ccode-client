import React from 'react'
import { Routes, Route } from 'react-router'
import Login from './Login'
import Dashboard from './views/dashboard'

export default function NavRoutes() {
    return (
        <Routes>
        <Route path={'/'} element={<Login/>}/>
        
        <Route path={'/dashboard'} element={<Dashboard/>}/>
        
      </Routes>
    )
}
