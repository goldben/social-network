import React from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faBell } from "@fortawesome/free-solid-svg-icons";

import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import axios from "./axios";
import { Profile } from "./profile";
import { OtherProfile } from "./other-profile";
import { FindPeople } from "./find-people";
import Friends from "./friends";
import { FriendsOfFriends } from "./friends-of-friends";
import About from "./about";

import FindPeopleInHeader from "./find-people-in-header";
import { Uploader } from "./uploader";

import LastChats from "./last-chats";

export class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            uploaderVisible: false,
            showChats: false,
            query: "last3"
        };
        this.uploaded = this.uploaded.bind(this);
        this.showUploader = this.showUploader.bind(this);
        this.showChats = this.showChats.bind(this);
        this.hideChats = this.hideChats.bind(this);
        this.hideUploader = this.hideUploader.bind(this);
    }
    showChats() {
        this.setState({
            showChats: true
        });
    }
    hideChats(e) {
        this.setState({
            showChats: false
        });
    }
    uploaded(url) {
        this.setState({
            imageUrl: url,
            uploaderVisible: false
        });
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

    componentDidMount() {
        axios.get("/user").then(({ data }) => {
            if (data.error) {
                location.replace("/welcome");
            } else {
                this.setState(data);
            }
        });
    }

    render() {
        const imageUrl = this.state.imageUrl || "/img/default.png";
        const coverImgUrl = this.state.coverImgUrl;
        const id = this.state.id;
        const first = this.state.first;
        const last = this.state.last;
        const query = this.state.query;

        if (!id) {
            return <img src="/img/spinner.gif" />;
        }
        return (
            <BrowserRouter>
                <div>
                    <div className="app-container">
                        <header>
                            <FindPeopleInHeader />
                            <div className="nav-bar-1">
                                <Link
                                    to="/profile"
                                    className="nav-btn img-icon"
                                >
                                    <img src={imageUrl} />
                                    <p>{first}</p>
                                </Link>
                                <div
                                    className="nav-btn"
                                    onClick={this.showChats}
                                >
                                    <p>messages</p>
                                    {this.state.showChats && <LastChats />}
                                </div>
                            </div>
                            <div className="nav-bar-2">
                                <a href="/logout" className="nav-btn">
                                    <FontAwesomeIcon icon={faSignOutAlt} />
                                </a>
                            </div>
                        </header>
                        <div className="body" onClick={this.hideChats}>
                            {this.state.uploaderVisible && (
                                <Uploader
                                    uploaded={this.uploaded}
                                    hideUploader={this.hideUploader}
                                    imageUrl={imageUrl}
                                />
                            )}

                            <Route
                                path="/profile"
                                render={() => (
                                    <Profile
                                        imageUrl={imageUrl}
                                        coverImgUrl={coverImgUrl}
                                        id={id}
                                        first={first}
                                        last={last}
                                        showUploader={this.showUploader}
                                    />
                                )}
                            />
                            <Route
                                path="/user/:id"
                                render={props => (
                                    <OtherProfile
                                        key={props.match.url}
                                        match={props.match}
                                        history={props.history}
                                    />
                                )}
                            />
                            <Route
                                path={"/profile/friends"}
                                render={() => <Friends />}
                            />
                            <Route
                                path={"/profile/about"}
                                render={() => <About />}
                            />
                            <Route
                                path={"/user/:id/friends"}
                                render={props => (
                                    <FriendsOfFriends
                                        key={props.match.url}
                                        match={props.match}
                                        history={props.history}
                                    />
                                )}
                            />
                            <Route
                                path={"/find"}
                                render={() => <FindPeople />}
                            />
                            <Route path={"/chat"} render={() => <ChatPage />} />
                        </div>
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}
