import React from "react";
import { BrowserRouter, HashRouter, Route, Link } from "react-router-dom";
import Friends from "./friends";
import { About } from "./about";
import { PhotoViewer } from "./photo-viewer";

import { Uploader } from "./cover-uploader";
import axios from "./axios";
import { ProfilePic } from "./profilepic";

export class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            uploaderVisible: false,
            coverImgUrl: this.props.coverImgUrl
        };
        this.uploaded = this.uploaded.bind(this);
        this.showUploader = this.showUploader.bind(this);
        this.hideUploader = this.hideUploader.bind(this);
    }
    showUploader() {
        this.setState({
            uploaderVisible: true
        });
    }
    hideUploader() {
        this.setState({
            uploaderVisible: false
        });
    }

    uploaded(url) {
        this.setState({
            imageUrl: url,
            uploaderVisible: false
        });
    }
    render() {
        console.log(this.state);
        let coverImgurl;
        if (this.state.coverImgUrl) {
            coverImgurl = this.state.coverImgUrl;
        } else {
            coverImgurl =
                "https://images.unsplash.com/photo-1557502706-5a0e03129173";
        }
        let image = `url("${coverImgurl}")`;
        let backgroundImg = {
            backgroundImage: image,
            backgroundSize: "cover",
            //            backgroundRepeat: "no-repeat",
            height: "300px",
            width: "100%",
            borderBottom: "solid #d4dce9 1px",
            borderLeft: "solid #d4dce9 1px",
            borderRight: "solid #d4dce9 1px",
            color: "white"
        };
        console.log("this.props in prfile", this.props);
        return (
            <BrowserRouter>
                <div className="profile-container">
                    <div className="profile-top">
                        <div
                            className="cover-img-container"
                            style={backgroundImg}
                            onClick={() => {
                                this.showUploader();
                                console.log("click", "show image viewer");
                            }}
                        >
                            <div className="clicker" />
                            <Uploader />
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
                        <Link to="/profile/about" className="timeline-nav-btn">
                            About
                        </Link>
                        <Link
                            to="/profile/friends"
                            className="timeline-nav-btn"
                        >
                            Friends
                        </Link>
                        <span className="timeline-nav-btn">Photos</span>
                        <span className="timeline-nav-btn">Archive</span>
                        <span className="timeline-nav-btn">More</span>
                    </div>
                    <div className="profile-bottom">
                        <Route path="/profile/friends" component={Friends} />
                        <Route
                            path="/profile/about"
                            render={props => (
                                <About
                                    bio={this.props.bio}
                                    updateBio={this.updateBio}
                                />
                            )}
                        />
                    </div>
                    {this.state.uploaderVisible && (
                        <PhotoViewer
                            hideUploader={this.hideUploader}
                            uploaded={this.uploaded}
                            coverImageUrl={coverImgurl}
                            imageUrl={this.props.imageUrl}
                            first={this.props.first}
                            last={this.props.last}
                        />
                    )}
                </div>
            </BrowserRouter>
        );
    }
}
