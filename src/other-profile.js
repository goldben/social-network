import React from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import axios from "./axios";
import { Profile } from "./profile";
import { ProfilePic } from "./profilepic";
import { FriendshipButton } from "./friendship-button1";
import ChatBox from "./chat-box";

export class OtherProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showChatBox: false
        };
        this.showChatBox = this.showChatBox.bind(this);
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        axios.get("/otheruser/" + id).then(({ data }) => {
            //console.log("request for same user");
            if (data.success == false) {
                this.props.history.push("/");
            } else {
                //        console.log("data at other profile", data);
                this.setState(data);
            }
        });
    }
    showChatBox() {
        //    console.log("showChatBox", this.state.showChatBox);
        if (!this.state.showChatBox) {
            this.setState({
                showChatBox: true
            });
        } else {
            this.setState({
                showChatBox: false
            });
        }
        //    console.log("showChatBox", this.state.showChatBox);
    }
    render() {
        let coverImgurl;
        if (this.props.coverImgUrl) {
            coverImgurl = `url(${this.props.coverImgUrl})`;
        } else {
            coverImgurl =
                'url("https://images.unsplash.com/photo-1557502706-5a0e03129173")';
        }

        let backgroundImg = {
            backgroundImage: coverImgurl,
            height: "300px",
            width: "100%",
            borderBottom: "solid #d4dce9 1px",
            borderLeft: "solid #d4dce9 1px",
            borderRight: "solid #d4dce9 1px",
            color: "white"
        };

        //    console.log("other profile this.state: ", this.state);
        return (
            <div className="profile-container">
                <div className="profile-top">
                    <div style={backgroundImg}>
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

                                {true && (
                                    <button
                                        className="friend-btn"
                                        onClick={() => {
                                            this.showChatBox();
                                        }}
                                    >
                                        Message
                                    </button>
                                )}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="timeline-nav-top">
                    <span className="timeline-nav-btn">Timeline</span>
                    <Link
                        to={`/user/${this.props.match.params.id}`}
                        className="timeline-nav-btn"
                    >
                        About
                    </Link>
                    <Link
                        to={`/user/${this.props.match.params.id}/friends`}
                        className="timeline-nav-btn"
                    >
                        Friends
                    </Link>
                </div>
                <div className="profile-bottom">
                    <div className="friends-bio">{this.state.bio}</div>
                </div>
                {this.state.showChatBox && (
                    <ChatBox
                        hideChatBox={this.showChatBox}
                        id={this.props.match.params.id}
                        imgurl={this.state.imgurl}
                        first={this.state.first}
                        last={this.state.last}
                    />
                )}
            </div>
        );
    }
}
