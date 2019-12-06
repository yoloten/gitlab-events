import { createStore, applyMiddleware } from 'redux'
import socketReducer from "./reducer"
import thunk from 'redux-thunk'

export const store =  createStore(socketReducer, applyMiddleware(thunk))