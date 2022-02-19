import React from 'react'
import Breadcrumbs from '../ui-components/Breadcrumbs'
import Header from '../ui-components/Header'
import LeftMenu from '../ui-components/LeftMenu'
import Profile from '../ui-components/Profile'

function ProfilePage() {
  return (
    <>
    <Header />
    <LeftMenu />
    <Breadcrumbs />
    <Profile />
    </>
  )
}

export default ProfilePage