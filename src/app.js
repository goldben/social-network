import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "./axios";
import { Profile } from "./profile";
import { OtherProfile } from "./other-profile";
import { Uploader } from "./uploader";

export class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            uploaderVisible: false
        };
        this.updateBio = this.updateBio.bind(this);
        this.uploaded = this.uploaded.bind(this);
        this.showUploader = this.showUploader.bind(this);
        this.hideUploader = this.hideUploader.bind(this);
    }

    uploaded(url) {
        this.setState({
            imageUrl: url,
            uploaderVisible: false
        });
    }
    updateBio(newText) {
        this.setState({
            bio: newText
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
        const id = this.state.id;
        const first = this.state.first;
        const last = this.state.last;
        const bio = this.state.bio;

        if (!id) {
            return <img src="/img/spinner.gif" />;
        }
        return (
            <div className="app-container">
                <header>
                    <img src="/img/facebook-logo.png" className="logo" />
                    <span className="search-users">
                        <input name="search" type="text" placeholder="search" />
                        <div className="search-results" />
                    </span>
                    <div className="nav-bar-1">
                        <a href="/" className="nav-btn">
                            <img src={imageUrl} />
                            <p>{first}</p>
                        </a>
                        <a href="/" className="nav-btn">
                            Home
                        </a>
                        <div className="nav-btn">Create</div>
                    </div>
                    <div className="nav-bar-2">
                        <div className="nav-btn">FR</div>
                        <div className="nav-btn">ME</div>
                        <a href="/logout" className="nav-btn">
                            Logout
                        </a>
                    </div>
                </header>
                {this.state.uploaderVisible && (
                    <Uploader
                        uploaded={this.uploaded}
                        hideUploader={this.hideUploader}
                    />
                )}
                <div className="timeline">
                    <BrowserRouter>
                        <div>
                            <Route
                                exact
                                path="/"
                                render={() => (
                                    <Profile
                                        imageUrl={imageUrl}
                                        id={id}
                                        first={first}
                                        last={last}
                                        bio={bio}
                                        showUploader={this.showUploader}
                                        updateBio={this.updateBio}
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
                        </div>
                    </BrowserRouter>
                </div>
            </div>
        );
    }
}
