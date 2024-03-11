import React, { useEffect } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import Topbar from '../../components/Topbar'
import { useCookies } from 'react-cookie'

const RootLayout = () => {
  const [cookies, setCookies, removeCookie] = useCookies("accessToken")
  console.log("reacher here");

  return (
    <>
      {cookies.accessToken ? <>
        <Topbar />
        <Outlet />
      </> : <Navigate to="/sign-up" />}

    </>
  )
}

export default RootLayout