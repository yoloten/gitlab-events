import { normalizeDate } from "../utils/normalizeDate"
import React from 'react'

import CommentIcon from '../styles/icons/CommentIcon'
import TimerIcon from "../styles/icons/TimerIcon"
import LinkIcon from "../styles/icons/LinkIcon"
import BookIcon from "../styles/icons/BookIcon"
import "../styles/css/Comment.css"


export default function Comment({ comment }) {

    const showEventForComment = (comment) => {
        if (comment.note.noteable_type === "MergeRequest" || comment.note.noteable_type === "Issue") {
            return <div className="comment-title"> {"Title: " + comment.target_title}</div>
        }

        if (comment.object_attributes.noteable_type === "Commit") {
            return <div className="comment-commit">
                <div className="comment-commit-head">
                    <TimerIcon />
                    Commit
                </div>
                <div className="merge-commit-head">
                    <div className="merge-commit-message">
                        {comment.commit.message}
                    </div>
                    <div className="merge-commit-id">
                        {comment.commit.id.slice(0, 8)}
                        <a href={comment.commit.url}><LinkIcon /></a>
                    </div>
                </div>
                <div className="merge-commit-created">
                    <div className="merge-commit-author">
                        <span className="merge-author-name">{comment.commit.author.name}</span>
                        {" commited on"}
                    </div>
                    <div className="merge-commit-timestamp">
                        {normalizeDate(comment.commit.timestamp)}
                    </div>
                </div>
            </div>
        }

        if (comment.object_attributes.noteable_type === "MergeRequest") {
            return <div className="comment-merge">
                <div className="mr">Merge Request</div>
                <div className="comment-merge-main">
                    <div className="comment-merge-title">
                        <div>{comment.merge_request.title}</div>
                        <div className="comment-merge-description">{comment.merge_request.description}</div>
                    </div>
                    <div className="comment-merge-state">{comment.merge_request.state}</div>
                </div>
                <div className="comment-merge-bottom">
                    <span className="comment-merge-created">
                        {'Opened on ' + comment.merge_request.created_at.toLocaleString("ru-RU").slice(0, 10)}
                    </span>
                    {comment.merge_request.state === 'closed'
                        ? <span className="comment-merge-created">
                            {'Closed on ' + comment.merge_request.updated_at.toLocaleString("ru-RU").slice(0, 10)}
                        </span>
                        : ""
                    }
                    <a href={comment.merge_request.url}><LinkIcon /></a>
                </div>
            </div>
        }

        if (comment.object_attributes.noteable_type === "Issue") {
            return <div className="comment-issue">
                <div className="mr">Issue</div>
                <div className="comment-merge-main">
                    <div className="comment-merge-title">
                        <div>{comment.issue.title}</div>
                        <div className="comment-merge-description">{comment.issue.description}</div>
                    </div>
                    <div className="comment-merge-state">{comment.issue.state}</div>
                </div>
                <div className="comment-merge-bottom">
                    <span className="comment-merge-created">
                        {'Opened on ' + comment.issue.created_at.toLocaleString("ru-RU").slice(0, 10)}
                    </span>
                    {comment.issue.state === 'closed'
                        ? <span className="comment-merge-created">
                            {'Closed on ' + comment.issue.updated_at.toLocaleString("ru-RU").slice(0, 10)}
                        </span>
                        : ""
                    }
                    <a href={comment.issue.url}><LinkIcon /></a>
                </div>
            </div>
        }
    }

    return (
        <div className="comment-main">
            {comment.object_attributes
                ? <>
                    <div className="header">
                        <div className="event-name-container">
                            <CommentIcon />
                            <div className="event-name">{`Comment on ${comment.object_attributes.noteable_type}`}</div>
                        </div>
                        <div className="project-info">
                            <div className="project">
                                <BookIcon />
                                <div className="name">{comment.repository.name}</div>
                            </div>
                        </div>
                    </div>
                    <div className="comment-content">
                        <div className="comment-head">
                            <div className="comment-created">
                                {'Created on '}
                                <span className="merge-author-name">
                                    {comment.object_attributes.created_at.toLocaleString("ru-RU").slice(0, 10)}
                                </span>
                                <span className="merge-author"> {"by " + comment.user.username}</span>
                            </div>
                            <div className="comment-id">
                                <div className="disc-id">{comment.object_attributes.discussion_id.slice(0, 8)}</div>
                                <a href={comment.object_attributes.url}><LinkIcon /></a>
                            </div>

                        </div>
                        <div className="comment-description">
                            {comment.object_attributes.description}
                        </div>

                        {showEventForComment(comment)}
                    </div>
                </>

                : <>
                    <div className="header">
                        <div className="event-name-container">
                            <CommentIcon />
                            <div className="event-name">{`Comment on ${comment.note.noteable_type}`}</div>
                        </div>
                        <div className="project-info">
                            <div className="project">
                                <BookIcon />
                                <div className="name">{comment.project_id}</div>
                            </div>
                        </div>
                    </div>
                    <div className="comment-content">
                        <div className="comment-head">
                            <div className="comment-created">
                                {'Created on '}
                                <span className="merge-author-name">
                                    {normalizeDate(comment.created_at)}
                                </span>
                                <span className="merge-author"> {"by " + comment.author_username}</span>
                            </div>
                            <div className="comment-id">
                                <div className="disc-id">{"ID:" + comment.note.id}</div>
                            </div>

                        </div>
                        <div className="comment-description">
                            {comment.note.body}
                        </div>

                        {showEventForComment(comment)}
                    </div>
                </>
            }
        </div>
    )
}
