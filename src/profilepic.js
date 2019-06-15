import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";

export function ProfilePic({ showUploader, imageUrl, first, last }) {
    imageUrl = imageUrl || "/img/default.png";
    return (
        <div className="profile-img-container">
            <img
                src={imageUrl}
                className="profile-img"
                alt={`${first} ${last}`}
            />
            <div className="overlay" onClick={showUploader}>
                <div>
                    <FontAwesomeIcon icon={faCamera} />
                    <h3>Update</h3>
                </div>
            </div>
        </div>
    );
}
