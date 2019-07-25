import React from "react";
import { useState, useEffect } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import axios from "./axios";
import { Link } from "react-router-dom";
import { FriendshipButton } from "./friendship-button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

export function FindPeople() {
    const [query, setQuery] = useState("last3");
    const [users, setUser] = useState([]);

    useEffect(
        () => {
            console.log(`${users.length} have been rendered!`);
            let abort;
            axios
                .post("/find-users", { find: query })
                .then(results => {
                    if (!abort) {
                        setUser(results.data.users);
                        return () => {
                            abort = true;
                        };
                    }
                })
                .catch(err => {
                    console.log("find-users error: ", err);
                });
        },
        [query]
    );

    return (
        <div className="find-page">
            <input
                name="find"
                type="text"
                placeholder="search"
                onChange={e => setQuery(e.target.value)}
            />
            <div className="find-main">
                <div className="filter">
                    <h2> Filter results</h2>
                </div>

                <div className="results">
                    {users.length ? (
                        users.map(user => (
                            <div key={user.id}>
                                <div className="search-result">
                                    <div className="">
                                        <Link to={`/user/${user.id}`}>
                                            <img
                                                src={
                                                    user.imgurl ||
                                                    "/img/default.png"
                                                }
                                                alt={`${user.first} ${
                                                    user.last
                                                }`}
                                            />
                                        </Link>
                                    </div>
                                    <div className="info">
                                        <Link to={`/user/${user.id}`}>
                                            <h3>
                                                {user.first} {user.last}
                                            </h3>
                                        </Link>

                                        <div className="card-bio">
                                            <p>{user.bio}</p>
                                        </div>
                                    </div>
                                    <div className="friend-btn-container">
                                        <FriendshipButton
                                            receiverId={user.id}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="no-results">
                            <span>
                                <p>We couldn't find anything for</p>
                                <h4>{query}</h4>
                            </span>
                            <p>
                                Looking for people or posts? Try entering a
                                name, location or different words.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
