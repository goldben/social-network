import React from "react";
import { connect } from "react-redux";
import { useState, useEffect } from "react";
//import { getbio } from "./actions";
import { Link } from "react-router-dom";
import { FriendshipButton } from "./friendship-button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { Bio } from "./bio";

export class About extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        //this.props.dispatch(getBio());
    }

    render() {
        console.log("about props", this.props);
        return (
            <div>
                <Bio bio={this.props.bio} updateBio={this.props.updateBio} />
                <div className="posts-container">
                    <h1>posts</h1>
                </div>
            </div>
        );
    }
}
