import socketReceiver from '../utils/receiver'
import axios from 'axios'

export const socketAction = () => {
    return (dispatch) => {
        socketReceiver.init(dispatch, "GET_DATA_FROM_SOCKET")
    }
}

export const eventsHistory = () => {
    return async (dispatch) => {
        const events = await axios.post("https://a7f0dc09-09c4-4cfc-9efb-44e25b4ec444.mock.pstmn.io/post")
        
        dispatch({
            type: "GET_EVENTS_HISTORY",
            payload: events.data
        })
    }
}
