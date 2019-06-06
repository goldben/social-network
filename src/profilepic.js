import React from "react";

export function ProfilePic({ showUploader, imageUrl, first, last }) {
    imageUrl = imageUrl || "/img/default.png";
    return (
        <div className="profile-img-container">
            <img
                src={imageUrl}
                className="profile-img"
                alt={`${first} ${last}`}
            />
            <div className="overlay" onClick={showUploader} />
        </div>
    );
}
