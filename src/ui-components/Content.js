import React from 'react'
import css from "./content.module.css"
import Toolbar from './Toolbar'

function Content() {
    
    const zoomMenu = [
        {name: "zoomIn", onClick: () => alert("Zoom In") },
        {name: "zoomOut", onClick: () => alert("Zoom Out") },
        {name: "panTool", onClick: () => alert("Pan Tool") }
    ]

    const viewMenu = [
        {name: "viewList", onClick: () => alert("View List") },
        {name: "hive", onClick: () => alert("View Chart") },
    ]
  return (
    <div className={css.container}>
        <Toolbar list={zoomMenu} type="default" location={["horizontal", "right", "top"]} />
        <Toolbar list={viewMenu} type="default" location={["vertical", "left", "bottom"]} />
    </div>
  )
}

export default Content