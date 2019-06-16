import React from "react";
import { connect } from "react-redux";
import { useState, useEffect } from "react";
import { getFriends, send, accept, unfriend } from "./actions";
import { Link } from "react-router-dom";
import { FriendshipButton } from "./friendship-button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

class Friends extends React.Component {
    componentDidMount() {
        this.props.dispatch(getFriends());
    }

    render() {
        console.log("render, friends: ", this.props.friends);
        console.log("render, pending: ", this.props.pending);
        if (!this.props.pending) {
            return <div className="loading" />;
        }

        return (
            <div className="friends">
                <div>
                    <h1>Friends</h1>
                    <friends-list>
                        {this.props.friends.length &&
                            this.props.friends.map(friend => (
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
                                        <div className="friend-btn">
                                            <div className="dropdown">
                                                <button className="friend-btn">
                                                    <FontAwesomeIcon
                                                        icon={faCheck}
                                                    />
                                                    &nbsp;Friends
                                                </button>
                                                <div className="dropdown-content">
                                                    <a href="#">
                                                        Get notifications
                                                    </a>
                                                    <div className="border">
                                                        <a href="#">
                                                            Close friends
                                                        </a>
                                                        <a href="#">
                                                            acquaintances
                                                        </a>
                                                        <a href="#">
                                                            Add to another list
                                                        </a>
                                                    </div>
                                                    <a
                                                        href="#"
                                                        onClick={e =>
                                                            this.props.dispatch(
                                                                unfriend(
                                                                    friend.id
                                                                )
                                                            )
                                                        }
                                                    >
                                                        Unfriend
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </friends-list-item>
                                </div>
                            ))}
                    </friends-list>
                </div>
                <div>
                    <h1>Pending list</h1>

                    <pending-list>
                        {this.props.pending.length &&
                            this.props.pending.map(friend => (
                                <div key={friend.id}>
                                    <pending-list-item>
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
                                        <div>
                                            <button
                                                className="friend-btn"
                                                onClick={e =>
                                                    this.props.dispatch(
                                                        accept(friend.id)
                                                    )
                                                }
                                            >
                                                Accept
                                            </button>
                                        </div>
                                    </pending-list-item>
                                </div>
                            ))}
                    </pending-list>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    if (state.friends) {
        var friends = [];
        var pending = [];
        state.friends.forEach(item => {
            if (item.accepted == true) {
                friends.push(item);
            } else {
                pending.push(item);
            }
        });
    }

    return {
        friends: friends,
        pending: pending
    };
};

export default connect(mapStateToProps)(Friends);
