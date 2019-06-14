import React from "react";
import { HashRouter, Route, Link } from "react-router-dom";

import axios from "./axios";
import { ProfilePic } from "./profilepic";
import { Bio } from "./bio";

export class Profile extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="profile-container">
                <div className="profile-top">
                    <div className="cover-photo-container">
                        <ProfilePic
                            imageUrl={this.props.imageUrl}
                            first={this.props.first}
                            last={this.props.last}
                            showUploader={this.props.showUploader}
                        />
                        <div className="cover-content">
                            <span className="cover-name">
                                <h1>
                                    {this.props.first} {this.props.last}{" "}
                                </h1>
                            </span>
                        </div>
                    </div>
                </div>
                <div className="timeline-nav-top">
                    <span className="timeline-nav-btn">Timeline</span>
                    <span className="timeline-nav-btn">About</span>
                    <Link to="/friends" className="timeline-nav-btn">
                        Friends
                    </Link>
                    <span className="timeline-nav-btn">Photos</span>
                    <span className="timeline-nav-btn">Archive</span>
                    <span className="timeline-nav-btn">More</span>
                </div>
                <div className="profile-bottom">
                    <Bio
                        bio={this.props.bio}
                        updateBio={this.props.updateBio}
                    />
                    <div className="posts-container">
                        <h1>posts</h1>
                    </div>
                </div>
            </div>
        );
    }
}
