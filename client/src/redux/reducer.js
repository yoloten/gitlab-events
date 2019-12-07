const initialState = {
    data: []
}
const socketReducer = (state = initialState, action) => {
    switch (action.type) {
        case "GET_DATA_FROM_SOCKET":
            return {
                ...state,
                data: [...state.data.slice(0, 0), action.payload, ...state.data.slice(0, 9)]
            }
        case "GET_EVENTS_HISTORY":
            return {
                ...state,
                data: action.payload
            }
        default:
            return state;
    }
}
export default socketReducer