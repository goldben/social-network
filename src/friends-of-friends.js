import React from "react";
import { connect } from "react-redux";
import axios from "./axios";

import { useState, useEffect } from "react";
import { getFriends, send, accept, unfriend } from "./actions";
import { Link } from "react-router-dom";
import { FriendshipButton } from "./friendship-button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

export class FriendsOfFriends extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        const id = this.props.match.params.id;
        axios.get("/get-friends/" + id).then(({ data }) => {
            this.setState({
                friends: data
            });
        });
    }

    render() {
        console.log("render, friends: ", this.state.friends);
        if (!this.state.friends) {
            return <div className="loading" />;
        }

        return (
            <div className="friends">
                <div>
                    <h1>Friends</h1>
                    <friends-list>
                        {this.state.friends.length &&
                            this.state.friends.map(friend => (
                                <div key={friend.id}>
                                    <friends-list-item>
                                        <div className="">
                                            <Link to={`/user/${friend.id}`}>
                                                <img
                                                    src={
                                                        friend.imgurl ||
                                                        "/img/default.png"
                                                    }
                                                    alt={`${friend.first} ${
                                                        friend.last
                                                    }`}
                                                />
                                            </Link>
                                        </div>
                                        <div className="name">
                                            <Link to={`/user/${friend.id}`}>
                                                <h3>
                                                    {friend.first} {friend.last}
                                                </h3>
                                            </Link>
                                        </div>
                                    </friends-list-item>
                                </div>
                            ))}
                    </friends-list>
                </div>
            </div>
        );
    }
}
