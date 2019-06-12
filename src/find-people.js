import React from "react";
import { useState, useEffect } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import axios from "./axios";
import { Link } from "react-router-dom";
import { FriendshipButton } from "./friendship-button";

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
        <div className="find-people">
            <input
                name="find"
                type="text"
                placeholder="find people"
                onChange={e => setQuery(e.target.value)}
            />
            <div className="find-main">
                <div className="filter">
                    <h2> Filter results</h2>
                </div>

                <div className="results">
                    <h4>people</h4>

                    {users.length ? (
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
