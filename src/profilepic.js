import React from "react";

export function ProfilePic({ imageUrl, first, last, clickHandler }) {
    imageUrl = imageUrl || "/img/default.png";
    return (
		<div className="user-page">
        <img
            src={imageUrl}
            className="profile-img"
            alt={`${first} ${last}`}
            onClick={clickHandler}
        />
		<p>hallo {first}</p>
		</div>
    );
}
