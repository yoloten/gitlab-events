import socketReceiver from '../utils/receiver'
import { Events } from 'gitlab'

const api = new Events({
    token: '64ExNdahUVASxCixk8zH'
  })

export const socketAction = () => {
    return (dispatch) => {
        socketReceiver.init(dispatch, "GET_DATA_FROM_SOCKET")
    }
}

export const eventsHistory = () => {
    return async (dispatch) => {
        const history = await api.all()
        const filtered = history.filter(project => project.project_id === 15598315)
        
        dispatch({
            type: "GET_EVENTS_HISTORY",
            payload: filtered.slice(0, 10)
        })
    }
}
