// initial state
export const initialState = {
    mindMaps: [],
};

// actions
const actions = {
    ADD_MINDMAP: 'ADD_MAP',
    REMOVE_MINDMAP: "REMOVE_MAP",
    GET_MINDMAP: "GET_MAP",
    ADD_MAP_FLOW: "ADD_MAP_FLOW",
    UPDATE_MAP_NODE: "UPDATE_NODE"
};

export const addMindMap = (payload) => ({
    type: actions.ADD_MINDMAP,
    payload,
});

export const removeMindMap = (payload) => ({
    type: actions.REMOVE_MINDMAP,
    payload,
});

export const getMindMap = (payload) => ({
    type: actions.GET_MINDMAP,
    payload,
});

export const addMapFlow = (payload) => ({
    type: actions.ADD_MAP_FLOW,
    payload,
})

export const updateMapNode = (payload) => ({
    type: actions.UPDATE_MAP_NODE,
    payload,
})

export const mindMapReducer = (state = initialState, action) => {
    switch (action.type){
        case actions.ADD_MINDMAP: 
        // Adds MindMap to state, called on Home Screen
            return {
                ...state,
                mindMaps: state.mindMaps.concat(action.payload),
            }
        case actions.GET_MINDMAP:
        // Returns requested mindmap, called on Map Screen
        // Refactor: Don't think this is required
            const targetMap = state.mindMaps.filter(
                (map) => map.mapId === action.payload.mapId
            )
            return {
                targetMap
            }
        case actions.REMOVE_MINDMAP: {
        // Removes Mindmapfrom state, called on Home Screen
            const filteredMaps = state.mindMaps.filter(
            (map) => map.mapId !== action.payload
            );
            return { 
                ...state,
                mindMaps: filteredMaps 
            };
            }
        case actions.ADD_MAP_FLOW: {
        // Adds / updates mindmap flow to Mindmap state, called on Map Screen
            const updatedMapFlows = action.payload
            console.log(action.payload)
            
            return {
                ...state, 
                mindMaps: updatedMapFlows
            }
            }
        case actions.UPDATE_MAP_NODE: {
            // destructure payload
            const { testable, description } = action.payload.data
            const { mapId, nodeId } = action.payload
            
            let mindMaps = state.mindMaps // filter this by mapId, filter by node, replace node
            
            const targetMap = map => map.mapId === mapId
            const targetNode = node => node.id === nodeId

            const mapToUpdate = mindMaps.findIndex(targetMap)
            const nodeToUpdate = mindMaps[mapToUpdate].mapData.elements.findIndex(targetNode)

            // Update state object directly then return
            mindMaps[mapToUpdate].mapData.elements[nodeToUpdate].data.testable = testable
            mindMaps[mapToUpdate].mapData.elements[nodeToUpdate].data.description = description

            return {
                ...state,
                mindMaps: mindMaps
            }
        }
        default:
            return state
    }
}