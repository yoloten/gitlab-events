import { socketAction, eventsHistory } from './redux/action'
import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect } from 'react';
import './styles/css/App.css';

import MergeAndIssue from './containers/MergeAndIssue'
import Comment from './containers/Comment'
import Push from './containers/Push'

const App = () => {
  const state = useSelector((state) => state.data)
  
  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(socketAction())
    dispatch(eventsHistory())
  }, [])

  const matcher = (event, index) => {
    if (event.target_type === "Issue" 
        || event.target_type === "MergeRequest" 
        || event.object_kind === "issue" 
        || event.object_kind ===  "merge_request"
      ) {
      return <MergeAndIssue key={index} merge={event} />
    }

    if (event.push_data || event.object_kind === "push" ) {
      return <Push key={index} push={event} />
    }

    if (event.target_type === "Note" || event.object_kind === "comment" ) {
      return <Comment key={index} comment={event} />
    }
  }
  
  return (
    <div className="app">
      <div className="app-title">Gitlab Visualization</div>
      <div className="main">
        {state.map((event, index) => matcher(event, index))}
      </div>
    </div>
  )
}

export default App;
