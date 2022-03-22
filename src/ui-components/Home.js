import React from 'react'
import Toolbar from './Toolbar'
import Card from './Card'
import css from './home.module.css'
import { useStore } from '../store/Store'
import { addMindMap, removeMindMap } from '../store/mindMapReducer'

function Home() {
    const [state, dispatch] = useStore();
    const { mindMaps } = state;
    const [selectedMap, setSelectedMap] = React.useState('')
    
    function nextMapId(){
        const data = mindMaps;
        if (data.length === 0) {
            return 1;
        }
        const maxId = Math.max(...data.map(x => x.mapId));
        return maxId + 1;
    }

    //Bug: This info isn't passed to Map
    function handleAdd(){
        const flowkey = `map-flow-${nextMapId()}`
        dispatch(addMindMap({
            name: "New MindMap!",
            comment: "we are the comment",
            mapId: nextMapId(),
            key: flowkey,
            mapData: [],
        }))
    }

    function handleDelete(){
        if (selectedMap === ''){
            alert("No map selected!")
        } else {
            dispatch(removeMindMap(selectedMap))
            console.log("deleted")
        }
    }

    function handleSelectedMap(mapId){
        setSelectedMap(mapId)
    }
    const actionMenu = [
        {name: "add", onClick: () => handleAdd() },
        {name: "delete", onClick: () => handleDelete() }
    ]

  return (
    <div className={css.container}>
        <h1>Home</h1>
        <Toolbar list={actionMenu} type="alert" location={["vertical", "right", "bottom"]} />
        <div className={css.list}>
        {
            mindMaps.map(item => (
                <div className={css.item} key={item.mapId}>
                    <Card 
                        id={item.mapId}
                        onClick={() => handleSelectedMap(item.mapId)}
                        name={item.name}
                        comment={item.comment}
                        isSelected={item.mapId === selectedMap}
                    />
                </div>
            ))
        }
        </div>
    </div>
    
  )
}

export default Home