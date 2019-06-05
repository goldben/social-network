import React from "react";

export function ProfilePic({ showUploader, imageUrl, first, last }) {
    imageUrl = imageUrl || "/img/default.png";
	console.log("url in profilepic", imageUrl);
    return (
		<div className="user-page">
        <img
            src={imageUrl}
            className="profile-img"
            alt={`${first} ${last}`}
            onClick={showUploader}
        />
		</div>
    );
}
