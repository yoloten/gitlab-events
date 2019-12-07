import { normalizeDate } from '../utils/normalizeDate'
import React from 'react'

import MergeIcon from "../styles/icons/MergeIcon"
import AlertIcon from "../styles/icons/AlertIcon"
import TimerIcon from "../styles/icons/TimerIcon"
import LinkIcon from "../styles/icons/LinkIcon"
import BookIcon from "../styles/icons/BookIcon"
import '../styles/css/Merge.css'


export default function MergeAndIssue({ merge }) {  
    
    return (
        <div className="merge-main">
            {merge.object_attributes
                ? <>
                    <div className="header-merge">
                        <div className="header-leftside">
                            <div className="event-name-container">
                                {merge.object_kind === "issue" ? <AlertIcon /> : <MergeIcon />}
                                <div className="event-name">
                                    {merge.object_kind === "issue" ? "Issue Event" : "Merge Request"}
                                </div>
                            </div>
                            <div className="project-info">
                                <div className="project">
                                    <div className="id">
                                        {"ID " + merge.object_attributes.id}
                                    </div>
                                </div>
                                <div className="project">
                                    <BookIcon />
                                    <div className="name">{merge.repository.name}</div>
                                </div>
                            </div>
                        </div>
                        <div
                            className={merge.object_attributes.state === "opened" ? `state open` : `state close`}
                        >
                            {merge.object_attributes.state}
                        </div>
                    </div>
                    <div className="main-content">
                        <div className="main-head">
                            <div className="merge-created">
                                {'Opened on ' + merge.object_attributes.created_at.toLocaleString("ru-RU").slice(0, 10)}
                                <span className="merge-author"> {"by " + merge.user.username}</span>
                                <a className="merge-url" href={merge.object_attributes.url}><LinkIcon /></a>
                            </div>
                            {merge.object_attributes.state === 'closed'
                                ? <div className="merge-created">
                                    {'Closed on ' + merge.object_attributes.updated_at.toLocaleString("ru-RU").slice(0, 10)}
                                    <span className="merge-author"> {"by " + merge.user.username}</span>
                                </div>
                                : ''
                            }
                            <div className="from">
                                <span className="merge-author"> {merge.object_attributes.source_branch}</span>
                                {merge.object_kind === "issue" ? "" : " into "}
                                <span className="merge-author"> {merge.object_attributes.target_branch}</span>
                            </div>
                        </div>
                        <div className="title-description">
                            <div className="merge-title">
                                {merge.object_attributes.title}
                            </div>
                            <div className="event-description">
                                {merge.object_attributes.description}
                            </div>
                        </div>
                        {merge.object_kind === "issue"
                            ? ''
                            : <div className="commit-container">
                                <div className="latest">
                                    <TimerIcon />
                                    Latest Commit
                            </div>
                                <div className="merge-commit">
                                    <div className="merge-commit-head">
                                        <div className="merge-commit-message">
                                            {merge.object_attributes.last_commit.message}
                                        </div>
                                        <div className="merge-commit-id">
                                            {merge.object_attributes.last_commit.id.slice(0, 8)}
                                            <a href={merge.object_attributes.last_commit.url}><LinkIcon /></a>
                                        </div>
                                    </div>
                                    <div className="merge-commit-created">
                                        <div className="merge-commit-author">
                                            <span className="merge-author-name">{merge.object_attributes.last_commit.author.name}</span>
                                            {" commited on"}
                                        </div>
                                        <div className="merge-commit-timestamp">
                                            {normalizeDate(merge.object_attributes.last_commit.timestamp)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                </>
                : <>
                    <div className="header-merge">
                        <div className="header-leftside">
                            <div className="event-name-container">
                                {merge.target_type === "Issue" ? <AlertIcon /> : <MergeIcon />}
                                <div className="event-name">
                                    {merge.target_type === "Issue" ? "Issue Event" : "Merge Request"}
                                </div>
                            </div>
                            <div className="project-info">
                                <div className="project">
                                    <div className="id">
                                        {"ID " + merge.target_id}
                                    </div>
                                </div>
                                <div className="project">
                                    <BookIcon />
                                    <div className="name">{merge.project_id}</div>
                                </div>
                            </div>
                        </div>
                        <div
                            className={merge.action_name === "opened" ? `state open` : `state close`}
                        >
                            {merge.action_name}
                        </div>
                    </div>
                    <div className="main-content">
                        <div className="main-head">
                            <div className="merge-created">
                                {'Opened on '}
                                <span className="merge-author-name">
                                    {normalizeDate(merge.created_at)}
                                </span>
                                <span className="merge-author"> {"by " + merge.author_username}</span>
                            </div>
                            <div className="from">
                                {merge.target_type === "Issue" ? "" : " into "}
                                <span className="merge-author"> {merge.target_type === "Issue" ? "" : merge.target_id}</span>
                            </div>
                        </div>
                        <div className="title-description">
                            <div className="merge-title">
                                {merge.target_title}
                            </div>
                        </div>
                    </div>
                </>
            }
        </div >
    )
}
