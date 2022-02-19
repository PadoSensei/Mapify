import React from 'react'
import Breadcrumbs from '../ui-components/Breadcrumbs'
import Header from '../ui-components/Header'
import LeftMenu from '../ui-components/LeftMenu'
import Content from '../ui-components/Content'

function HomePage() {
  return (
    <>
    <Header />
    <LeftMenu />
    <Breadcrumbs />
    <Content />
    </>
  )
}

export default HomePage