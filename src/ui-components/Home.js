import React from 'react'
import Toolbar from './Toolbar'
import Card from './Card'
import css from './home.module.css'
import { useStore } from '../store/Store'
import { addMapNode } from '../store/mapNodeReducer'
import { removeMapNode } from '../store/mapNodeReducer'

function Home() {
    const [state, dispatch] = useStore();
    const { mapNodes } = state;
    const [selectedMap, setSelectedMap] = React.useState('')

    function nextId(){
        const data = mapNodes;
        if (data.length === 0) {
            return 1;
        }
        const maxId = Math.max(...data.map(x => x.id));
        return maxId + 1;
    }

    function handleAdd(){
        console.log("I'll add to globalState")
        dispatch(addMapNode({
            name: "Paddy",
            comment: "we are the comment",
            level: 0,
            id: nextId(),
            parentId: null
        }))
    }

    function handleDelete(){
        console.log("delete")
        if (selectedMap === ''){
            alert("No map selected!")
        }
        dispatch(removeMapNode(selectedMap))
    }

    function handleSelectedMap(id){
        setSelectedMap(id)
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
            mapNodes.map(item => (
                <div className={css.item} key={item.id}>
                    <Card 
                        id={item.id}
                        onClick={() => handleSelectedMap(item.id)}
                        name={item.name}
                        comment={item.comment}
                        isSelected={item.id === selectedMap}
                    />
                </div>
            ))
        }
        </div>
    </div>
    
  )
}

export default Home