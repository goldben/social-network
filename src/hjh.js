<div className="dropdown">
    <button className="friend-btn">Friends</button>
    <div className="dropdown-content">
        <a href="#">Get notifications</a>
        <a href="#">Close friends</a>
        <a href="#">acquaintances</a>
        <a href="#">Add to another list</a>
        <a href="#" onClick={e => this.props.dispatch(unfriend(friend.id))}>
            Unfriend
        </a>
    </div>
</div>;
