// initial state
export const initialState = {
    mapNodes: [],
};

// actions
const actions = {
    ADD_MAPNODE: 'ADD_MAPNODE',
    REMOVE_MAPNODE: "REMOVE_MAPNODE",

};

export const addMapNode = (payload) => ({
    type: actions.ADD_MAPNODE,
    payload,
});

export const removeMapNode = (payload) => ({
    type: actions.REMOVE_MAPNODE,
    payload,
});

export const mapNodeReducer = (state = initialState, action) => {
    switch (action.type){
        case actions.ADD_MAPNODE: 
            return {
                ...state,
                mapNodes: state.mapNodes.concat(action.payload),
            }
        case actions.REMOVE_MAPNODE: {
            const filteredMaps = state.mapNodes.filter(
            (map) => map.id !== action.payload
            );
            return { mapNodes: filteredMaps };
            }
        default:
            return state
    }
}