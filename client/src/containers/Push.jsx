import { normalizeDate } from '../utils/normalizeDate'
import React from 'react'

import BranchIcon from "../styles/icons/BranchIcon"
import PersonIcon from "../styles/icons/PersonIcon"
import TimerIcon from "../styles/icons/TimerIcon"
import LinkIcon from "../styles/icons/LinkIcon"
import BookIcon from "../styles/icons/BookIcon"
import PRIcon from "../styles/icons/PRIcon"
import '../styles/css/Push.css'

export default function Push({ push }) {
    console.log(push)
    return (
        <div className="push-main">
            {push.project
                ? <>
                    <div className="header">
                        <div className="event-name-container">
                            <PRIcon />
                            <div className="event-name">Push Event</div>
                        </div>
                        <div className="project-info">
                            <div className="project">
                                <div className="id">{"ID " + push.project_id}</div>
                            </div>
                            <div className="project">
                                <BookIcon />
                                <div className="name">{push.project.name}</div>
                            </div>
                            <div className="project">
                                <BranchIcon />
                                <div className="name">{push.project.default_branch}</div>
                            </div>
                            <div className="project">
                                <PersonIcon />
                                <div className="name">{push.user_username}</div>
                            </div>
                        </div>
                    </div>
                    <div className="commits">
                        <div className="commits-header">
                            <TimerIcon />
                            <div className="commits-count">{push.total_commits_count + " commits"}</div>
                        </div>
                        <div className="commit-list">
                            {push.commits.map((commit, index) => {

                                return <div key={index} className="commit">
                                    <div className="commit-head">
                                        <div className="commit-message">{commit.message}</div>
                                        <div className="commit-id">
                                            {commit.id.slice(0, 8)}
                                            <a href={commit.url}><LinkIcon /></a>
                                        </div>
                                    </div>
                                    <div className="commit-created">
                                        <div className="commit-author">
                                            <span className="author-name">{commit.author.name}</span>{" commited on"}
                                        </div>
                                        <div className="commit-timestamp">{normalizeDate(commit.timestamp)}</div>
                                    </div>
                                </div>
                            })
                            }
                        </div>
                    </div>
                </>
                :
                <>
                    <div className="header">
                        <div className="event-name-container">
                            <PRIcon />
                            <div className="event-name">Push Event</div>
                        </div>
                        <div className="project-info">
                            <div className="project">
                                <div className="id">{"ID " + push.project_id}</div>
                            </div>
                            <div className="project">
                                <BranchIcon />
                                <div className="name">{push.push_data.ref}</div>
                            </div>
                            <div className="project">
                                <PersonIcon />
                                <div className="name">{push.author_username}</div>
                            </div>
                        </div>
                    </div>
                    <div className="commits">
                        <div className="commits-header">
                            <TimerIcon />
                            <div className="commits-count">{push.push_data.commit_count > 1
                                ? push.push_data.commit_count + "commits"
                                : push.push_data.commit_count + "commit"}</div>
                        </div>
                        <div className="commit-list">
                            <div className="commit">
                                <div className="commit-head">
                                    <div className="commit-message">{push.push_data.commit_title}</div>
                                    <div className="commit-id">
                                        {push.push_data.commit_to.slice(0, 8)}
                                    </div>
                                </div>
                                <div className="commit-created">
                                    <div className="commit-author">
                                        <span className="author-name">{push.author_username}</span>{" commited on " + normalizeDate(push.created_at)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            }
        </div>
    )
}
