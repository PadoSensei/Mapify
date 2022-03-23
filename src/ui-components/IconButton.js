/* eslint-disable */
import React from 'react'
import PropTypes from 'prop-types'
import Icon from './Icon'
import css from './iconbutton.module.css'

IconButton.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
  onClick: PropTypes.func,
}

// role added per eslint, causes new 'needs to focus' error
function IconButton({ type, onClick, name }) {
  let className = css.container
  className += ` ${css[type]}`
  return (
    <div className={className} role="button" onClick={onClick}>
      <Icon type={type} name={name} />
    </div>
  )
}

export default IconButton
