import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import css from './card.module.css'

Card.propTypes = {
  name: PropTypes.string,
  comment: PropTypes.string,
  isSelected: PropTypes.bool,
  onClick: PropTypes.func,
  id: PropTypes.number,
}

function Card(props) {
  let className = css.container
  if (props.isSelected) {
    className += ` ${css.selected}`
  }
  return (
    <div className={className} onClick={props.onClick}>
      <div className={css.title}>{props.name}</div>
      <div className={css.comment}>{props.comment}</div>
      <Link to={`/map/${props.id}`}>Go to Map</Link>
    </div>
  )
}

export default Card
