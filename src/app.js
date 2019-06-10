import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { BrowserRouter, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "./axios";
import { Profile } from "./profile";
import { OtherProfile } from "./other-profile";
import { SearchResults } from "./search-results";
import FindPeopleInHeader from "./find-people-in-header";
import { Uploader } from "./uploader";

export class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            uploaderVisible: false,
            query: "default"
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
        const query = this.state.query;

        if (!id) {
            return <img src="/img/spinner.gif" />;
        }
        return (
            <BrowserRouter>
                <div>
                    <div className="app-container">
                        <header>
                            <img
                                src="/img/facebook-logo.png"
                                className="logo"
                            />
                            <FindPeopleInHeader />
                            <div className="nav-bar-1">
                                <Link to="/" className="nav-btn">
                                    <img src={imageUrl} />
                                    <p>{first}</p>
                                </Link>
                                <Link to="/" className="nav-btn">
                                    Home
                                </Link>
                                <div className="nav-btn">Create</div>
                            </div>
                            <div className="nav-bar-2">
                                <div className="nav-btn">FR</div>
                                <div className="nav-btn">ME</div>
                                <a href="/logout" className="nav-btn">
                                    <FontAwesomeIcon icon={faSignOutAlt} />
                                </a>
                            </div>
                        </header>
                        {this.state.uploaderVisible && (
                            <Uploader
                                uploaded={this.uploaded}
                                hideUploader={this.hideUploader}
                            />
                        )}

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
                </div>
            </BrowserRouter>
        );
    }
}
