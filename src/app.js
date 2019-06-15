import React from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import axios from "./axios";
import { Profile } from "./profile";
import { OtherProfile } from "./other-profile";
import { FindPeople } from "./find-people";
import FindPeopleInHeader from "./find-people-in-header";
import { Uploader } from "./uploader";
import Friends from "./friends";

export class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            uploaderVisible: false,
            query: "last3"
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
        const coverImgUrl = this.state.coverImgUrl;
        console.log(coverImgUrl);
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
                                imageUrl={imageUrl}
                            />
                        )}
                        <Route path="/friends" component={Friends} />
                        <Route
                            exact
                            path="/"
                            render={() => (
                                <Profile
                                    imageUrl={imageUrl}
                                    coverImgUrl={coverImgUrl}
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
                        <Route path={"/find"} render={() => <FindPeople />} />
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}
