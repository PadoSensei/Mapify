import React from 'react'
import css from "./header.module.css"

function Header() {
  return (
    <div className={css.container}>
      <div className={css.title}>Header</div>
    </div>
  )
}

export default Header