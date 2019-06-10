import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import axios from "./axios";
import { Link } from "react-router-dom";
import { ProfilePic } from "./profilepic";

export default function FindPeopleInHeader() {
    const [query, setQuery] = useState("last3");
    const [users, setUser] = useState([]);

    useEffect(
        () => {
            console.log(`"${users.length}" have been rendered!`);
            let abort;
            axios
                .post("/find-users", { find: query })
                .then(results => {
                    if (!abort) {
                        setUser(results.data.users.slice(0, 5));
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
        <div>
            <span className="search-users">
                <input
                    name="find"
                    type="text"
                    placeholder="search"
                    onChange={e => setQuery(e.target.value)}
                    onBlur={e =>
                        setTimeout(() => {
                            setQuery("last3");
                        }, 100)
                    }
                />
                <Link to="/find">
                    <div className="search-btn">
                        <FontAwesomeIcon icon={faSearch} />
                    </div>
                </Link>
            </span>

            <div className="header-search-results">
                {users.length
                    ? users.map(user => (
                          <div key={user.id}>
                              <Link to={`/user/${user.id}`}>
                                  <div className="search-result">
                                      <div className="info">
                                          <p>
                                              {user.first} {user.last}
                                          </p>
                                      </div>
                                  </div>
                              </Link>
                          </div>
                      ))
                    : null}
            </div>
        </div>
    );
}
