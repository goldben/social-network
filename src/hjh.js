<div className="friends-page">
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
                                        src={user.imgurl || "/img/default.png"}
                                        alt={`${user.first} ${user.last}`}
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
                                <FriendshipButton receiverId={user.id} />
                                <div className="small-message-btn">...</div>
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
                        Looking for people or posts? Try entering a name,
                        location or different words.
                    </p>
                </div>
            )}
        </div>
    </div>
</div>;
