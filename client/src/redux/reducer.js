const initialState = {
    data: [],
    fromSocket: []
}
const socketReducer = (state = initialState, action) => {
    switch (action.type) {
        case "GET_DATA_FROM_SOCKET":
            return {
                ...state,
                fromSocket: [...state.fromSocket.slice(0, 0), action.payload, ...state.fromSocket.slice(0, state.fromSocket.length)]
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