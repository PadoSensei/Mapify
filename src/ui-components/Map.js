import React, { useState, useCallback } from 'react'
import ReactFlow, { ReactFlowProvider, addEdge, removeElements, Controls, Background, MiniMap, useZoomPanHelper } from 'react-flow-renderer';
import { useStore } from '../store/Store'
import { useParams } from "react-router-dom"
import { addMapFlow } from '../store/mindMapReducer';
import Details from './Details'
import css from './map.module.css'


const onLoad = (reactFlowInstance) => {
    reactFlowInstance.fitView()
}

function Map() {
    //UseState
    const [name, setName] = useState("")
    const [rfInstance, setRfInstance] = useState(null);
    const [elements, setElements] = useState([])
    const params = useParams();
    const [state, dispatch] = useStore();
    const { mindMaps } = state;
    // Render-flow hooks
    const [isSelectable, setIsSelectable] = useState(true);
    const [captureElementClick, setCaptureElementClick] = useState(true);
    
    const targetMap = mindMaps.find(x => x.mapId === parseInt(params.mapId)); 
    const [detailsNode, setDetailsNode] = useState('')

    const flowkey = `map-flow-${params.mapId}`
    
    // Bug: Renders nodes created in Map, doesn't render info from Home screen

    React.useEffect(() => {
        onRestore()
        console.log(mindMaps, "State called on restore")
    }, [])

    const onSave = useCallback(() => {
        if(rfInstance) {
            const reactFlowObject = rfInstance.toObject();
            console.log(reactFlowObject, "react-flow object")
            // Loop finds current map in state 
            // Adds object to its mapData
            for (const mindMap of mindMaps){
                if (mindMap.key === flowkey){
                    mindMap.mapData = reactFlowObject
                }
            }
            // Pushes updated state back to global
            dispatch(addMapFlow(
                mindMaps
            ))
        }
        console.log("object saved to state")
    }, [rfInstance, dispatch, flowkey, mindMaps]);

    // Check map object for prev saved elements
    // Else set empty array
    const onRestore = useCallback(() => {
          if (targetMap) {
            setElements(targetMap.mapData.elements || []);
          }
        })

    function nextId(dataArray){
        const data = dataArray;
        if (data.length === 0) {
            return 1;
        }
        const maxId = Math.max(...data.map(x => parseInt(x.id)));
        return maxId + 1;
    }

    function addNode () {
        const newNodeObject = {
            id: nextId(elements).toString(),
            mapId: params.mapId,
            data: {
                label: `${name}`,
                date: Date.now(),
                testable: false,
                description: "helloWorld", 
                testArray:[]
            },
            position: {x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight}
        }
        setElements([ ...elements, newNodeObject]);
        setName("");
    };

    function nameHandler(event) {
        setName(event.target.value);
      }

    // Refactor to do this without using backspace
    function onElementsRemove (elementsToRemove) {
        setElements((els) => removeElements(elementsToRemove, els));
    }
    const onConnect = (params) => setElements(e => addEdge(params, e));

    function onElementClick(event, element) {
        const targetNode = elements.find(x => x.id === element.id);
        setDetailsNode(targetNode)
        console.log(targetNode, "targetNode displayed in Details")
    }

    return (
      <div className={css.container}>
        <ReactFlowProvider>
            <ReactFlow 
                elements={elements}
                style={{width:'80%', height: '95%'}}
                onConnect = {onConnect}
                connectionLineType='bezier'
                snapToGrid={true}
                snapGrid={[16,16]}
                onLoad={setRfInstance}
                elementsSelectable={isSelectable}
                onElementsRemove={onElementsRemove}
                onElementClick={captureElementClick ? onElementClick : undefined}
            >
                <Background color='light-blue' gap={5} />
                <MiniMap
                    nodeColor={n=> {
                    if(n.type === 'root') return 'black'
                    return 'blue'
                    }}
                />
                <Controls />
            </ReactFlow>
        </ReactFlowProvider>
        <div>
            <input type="text"
            onChange={nameHandler}
            value={name}
            name="title"/>
            <button
            onClick={addNode}
            type="button"
            >Add Node</button>
            <button onClick={onSave}>Save MindMap</button>
        </div>
            {
              detailsNode !== "" &&  
                (<Details targetMap={detailsNode}/>)
            }
      </div>
  )
}

export default Map