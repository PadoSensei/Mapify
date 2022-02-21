import React from 'react'
import Breadcrumbs from '../ui-components/Breadcrumbs'
import Header from '../ui-components/Header'
import LeftMenu from '../ui-components/LeftMenu'
import Home from '../ui-components/Home'

function HomePage() {
  return (
    <>
    <Header />
    <LeftMenu />
    <Breadcrumbs />
    <Home />
    </>
  )
}

export default HomePage