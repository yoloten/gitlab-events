import { socketAction, eventsHistory } from './redux/action'
import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect } from 'react';
import './styles/css/App.css';

import MergeAndIssue from './containers/MergeAndIssue'
import Comment from './containers/Comment'
import Push from './containers/Push'

const App = () => {
  const state = useSelector((state) => state)
  const { issue_comment, issue_open, issue_closed, push, merge_open, megre_closed, commit_comment, merge_comment } = state.data
  const { fromSocket } = state
  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(socketAction())
    dispatch(eventsHistory())
  }, [])

  const showFromSocketEvent = (event, index) => {
    switch (event.object_kind) {
      case "push":
        return <Push key={index} push={event}/>
      case "issue" || "merge_request":
        return <MergeAndIssue key={index}  merge={event} />
      case "comment":
        return <Comment key={index}  comment={event} />
      default:
        return ''
    }
  }

  return (
    <div className="app">
      <div className="app-title">Gitlab Visualization</div>
      <div className="main">
        {fromSocket.length > 0 
          ? fromSocket.map((event, index) => showFromSocketEvent(event, index))
          : '' 
        }
        <Push push={push} />
        <MergeAndIssue merge={merge_open} />
        <MergeAndIssue merge={megre_closed} />
        <MergeAndIssue merge={issue_open} />
        <MergeAndIssue merge={issue_closed} />
        <Comment comment={commit_comment} />
        <Comment comment={merge_comment} />
        <Comment comment={issue_comment} />
      </div>
    </div>
  )
}

export default App;
