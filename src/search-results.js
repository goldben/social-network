import React from "react";
import queryString from "query-string";
import { BrowserRouter, Route } from "react-router-dom";
import axios from "./axios";
import { Profile } from "./profile";
import { ProfilePic } from "./profilepic";

export class SearchResults extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        const query = queryString
            .parse(this.props.location.search)
            .then(query => {
                axios.post("/find-users?query=" + query).then(results => {
                    setUser(results.data.users.slice(0, 10));
                });
            });
    }

    render() {
        const users = this.state.users;
        console.log("this.state", this.state);
        return (
            <div className="find-people">
                <div className="find-main">
                    <div className="filter">
                        <h2> Filter results</h2>
                    </div>

                    <div className="results">
                        {users.length &&
                            users.map(user => (
                                <div key={user.id}>
                                    <Link to={`/user/${user.id}`}>
                                        <div className="search-result">
                                            <div className="">
                                                <img
                                                    src={
                                                        user.imgurl ||
                                                        "/img/default.png"
                                                    }
                                                    alt={`${user.first} ${
                                                        user.last
                                                    }`}
                                                />
                                            </div>
                                            <div className="info">
                                                <h3>
                                                    {user.first} {user.last}
                                                </h3>
                                                <div className="card-bio">
                                                    <p>{user.bio}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        );
    }
}
