import React from 'react'
import useBreadcrumbs from 'use-react-router-breadcrumbs'
import { useNavigate } from 'react-router'
import css from './breadcrumbs.module.css'

// To Do
// Add Cond styling on last backslash?

function Breadcrumbs() {
  const breadcrumbs = useBreadcrumbs()
  const navigate = useNavigate()
  return (
    <div className={css.container}>
      {breadcrumbs.map(({ breadcrumb }) => (
        <span key={breadcrumb.key}>
          <span
            className={css.item}
            onClick={() => navigate(`${breadcrumb.key}`)}
          >
            {breadcrumb}
          </span>
          /
        </span>
      ))}
    </div>
  )
}

export default Breadcrumbs
