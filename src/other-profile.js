import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import axios from "./axios";
import { Profile } from "./profile";
import { ProfilePic } from "./profilepic";
import { FriendshipButton } from "./friendship-button1";

export class OtherProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        axios.get("/otheruser/" + id).then(({ data }) => {
            console.log("request for same user");
            if (data.success == false) {
                this.props.history.push("/");
            } else {
                console.log("data at other profile", data);
                this.setState(data);
            }
        });
    }

    render() {
        console.log("other profile this.state: ", this.state);
        return (
            <div className="profile-container">
                <div className="profile-top">
                    <div className="cover-photo-container">
                        <div className="profile-img-container">
                            <img
                                src={this.state.imgurl}
                                className="profile-img"
                                alt={`${this.state.first} ${this.state.last}`}
                            />
                        </div>

                        <div className="cover-content">
                            <span className="cover-name">
                                <h1>
                                    {this.state.first} {this.state.last}
                                </h1>
                            </span>
                            <span className="profile-action">
                                <FriendshipButton
                                    receiverId={this.props.match.params.id}
                                />

                                <button>Message</button>
                            </span>
                        </div>
                    </div>
                </div>
                <div className="profile-bottom">
                    <div className="bio-container">
                        <h3>intro</h3>
                        {this.state.bio}
                    </div>
                    <div className="posts-container">
                        <h3>posts</h3>
                    </div>
                </div>
            </div>
        );
    }
}
