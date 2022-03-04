import React, { useState, useCallback } from 'react'
import ReactFlow, { ReactFlowProvider, addEdge, removeElements, Controls, Background, MiniMap, useZoomPanHelper } from 'react-flow-renderer';
import { useStore } from '../store/Store'
import { useParams } from "react-router-dom"
import Details from './Details'
import css from './map.module.css'
import { addMapFlow, addMindMap, getMindMap } from '../store/mindMapReducer';


const onLoad = (reactFlowInstance) => {
    reactFlowInstance.fitView()
}

function Map() {
    //UseState
    const [name, setName] = useState('')
    const [rfInstance, setRfInstance] = useState(null);
    const [elements, setElements] = useState([])
    const params = useParams();
    const [state, dispatch] = useStore();
    const { mindMaps } = state;
    // Render-flow hooks
    const [isSelectable, setIsSelectable] = useState(true);
    const [captureElementClick, setCaptureElementClick] = useState(true);
    
    const targetMap = mindMaps.find(x => x.mapId === parseInt(params.mapId)); 
    const [detailsNode, setDetailsNode] = useState(targetMap)

    const flowkey = `map-flow-${params.mapId}`
    

    
    // Bug: Renders nodes created in Map, doesn't render info from Home screen
    
    // React.useEffect(() => {
    //     if(targetMap.data.elements){
    //         setElements(targetMap.data.elements)
    //     } else {
    //         setElements(targetMap.data)
    //     }
    // },[])

    React.useEffect(() => {
        //onSave()
        onRestore()
    }, [])

    const onSave = useCallback(() => {
        if(rfInstance) {
            const map = rfInstance.toObject();
            console.log(map)
            for (const mindMap of mindMaps){
                if (mindMap.key === flowkey){
                    mindMap.data = map
                }
            }
            dispatch(addMapFlow(
                mindMaps
            ))
        }
    }, [rfInstance, dispatch, flowkey, mindMaps]);

    const onRestore = useCallback(() => {
    
          if (targetMap) {
            //const [x = 0, y = 0] = flow.position;
            setElements(targetMap.data.elements || []);
            //transform({ x, y, zoom: flow.zoom || 0 });
          }
        })

    function nextId(dataArray){
        const data = dataArray;
        if (data.length === 0) {
            return 1;
        }
        const maxId = Math.max(...data.map(x => x.id));
        return maxId + 1;
    }

    // Bug - id's are assigned incorrectly, [1,3,5,7,9....]
    const addNode = () => {
        //console.log(elements)
        const firstNode = [targetMap.data] || [targetMap.data.elements]
        //console.log(firstNode)
        const newNodeObject = {
            id: (elements.length+1).toString(),
            // id: nextId(elements),
            data: {
                label: `${name}`, 
                details: 
                {
                    comment: "I can carry a payload"
                }
            },
            position: {x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight}
        }
        setElements([...firstNode, ...elements, newNodeObject]);
    };

    function onElementsRemove (elementsToRemove) {
        setElements((els) => removeElements(elementsToRemove, els));
    }

    
    const onConnect = (params) => setElements(e => addEdge(params, e));

    function onElementClick(event, element) {
        const targetNode = elements.find(x => x.id === element.id);
        setDetailsNode(targetNode)
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
            onChange={e => setName(e.target.value)}
            name="title"/>
            <button
            onClick={addNode}
            type="button"
            >Add Node</button>
            <button onClick={onSave}>Save MindMap</button>
        </div>
            <Details targetMap={detailsNode}/>
      </div>
  )
}

export default Map