import React from 'react'
import PropTypes from 'prop-types'
import IconButton from './IconButton'
import css from './toolbar.module.css'

Toolbar.propTypes = {
  location: PropTypes.any,
  list: PropTypes.array,
  type: PropTypes.string,
  map: PropTypes.func,
  forEach: PropTypes.func,
}

function Toolbar(props) {
  let className = css.container
  props.location.forEach((item) => {
    className += ` ${css[item]}`
  })
  return (
    <div className={className}>
      {props.list.map((item) => (
        <div className={css.button} key={item.name}>
          <IconButton
            key={item.name}
            name={item.name}
            onClick={item.onClick}
            type={props.type}
          />
        </div>
      ))}
    </div>
  )
}

export default Toolbar
