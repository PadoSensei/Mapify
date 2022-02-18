import React from 'react'
import css from "./leftmenu.module.css"
import Toolbar from './Toolbar'

function LeftMenu() {
  const list = [
    {name: "home", onClick: () => alert("Home") },
    {name: "help", onClick: () => alert("Help") }
]
  return (
    <div className={css.container}>
      <Toolbar list={list} type="primary" location={["vertical"]} />
    </div>
  )
}

export default LeftMenu