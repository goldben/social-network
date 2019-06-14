import React from "react";
import { connect } from "react-redux";
import { useState, useEffect } from "react";
import { getFriends, send, accept, unfriend } from "./actions";
import { Link } from "react-router-dom";
import { FriendshipButton } from "./friendship-button";

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
            <friends>
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
                                            <button
                                                onClick={e =>
                                                    this.props.dispatch(
                                                        unfriend(friend.id)
                                                    )
                                                }
                                            >
                                                Unfriend
                                            </button>
                                        </div>
                                    </friends-list-item>
                                </div>
                            ))}
                    </friends-list>
                </div>
                <div>
                    <h1>Pending list</h1>

                    {this.props.pending.length &&
                        this.props.pending.map(friend => (
                            <div key={friend.id}>
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
                                <div className="info">
                                    <Link to={`/user/${friend.id}`}>
                                        <h3>
                                            {friend.first} {friend.last}
                                        </h3>
                                    </Link>
                                </div>
                            </div>
                        ))}
                </div>
            </friends>
        );
    }
}

// return { myAnimals: state.listAnimals };

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
        // let friends = state.friends_wannabes.filter(accepted == true);
        // let pending = state.friends_wannabes.filter(accepted == false);
    }

    return {
        friends: friends,
        pending: pending
    };
};

export default connect(mapStateToProps)(Friends);
