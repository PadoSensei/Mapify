import React from 'react'
import Details from './Details'
import css from './map.module.css'
import { useParams } from "react-router-dom"
import { useStore } from '../store/Store'

function Map() {
  const params = useParams();
  const [state, dispatch] = useStore();
  const { mapNodes } = state;
  const targetMap = mapNodes.find(x => x.id === parseInt(params.mapID));
  

  return (
    <div className={css.container}>
      <h1>Map</h1>
       <Details targetMap={targetMap}/>
    </div>
  )
}

export default Map