import React from "react";
import { connect } from "react-redux";
import { useState, useEffect } from "react";
import { getFriends } from "./actions";
import { Link } from "react-router-dom";

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
                    <h1>Friends list</h1>
                    {this.props.friends.length &&
                        this.props.friends.map(friend => (
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
