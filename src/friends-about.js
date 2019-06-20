import React from "react";
import { connect } from "react-redux";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FriendshipButton } from "./friendship-button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Bio } from "./bio";

export class FriendsAbout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        //this.props.dispatch(getBio());
    }
    render() {
        console.log("about props: ", this.props);
        return (
            <div className="main">
                <div>
                    <FontAwesomeIcon icon={faUser} className="icon" />
                    <h2>About</h2>
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
