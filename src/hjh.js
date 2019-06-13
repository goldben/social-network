const elm = (
    <div className="search-result">
        <div className="">
            <Link to={`/user/${friend.id}`}>
                <img
                    src={friend.imgurl || "/img/default.png"}
                    alt={`${friend.first} ${friend.last}`}
                />
            </Link>
        </div>
        <div className="info">
            <Link to={`/user/${friend.id}`}>
                <h3>
                    {friend.first} {friend.last}
                </h3>
            </Link>

            <div className="card-bio">
                <p>{friend.bio}</p>
            </div>
        </div>
        <div className="friend-btn-container">
            <FriendshipButton receiverId={friend.id} />
            <div className="small-message-btn">...</div>
        </div>
    </div>
);
