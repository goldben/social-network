import React from "react";
import { useState, useEffect } from "react";
import axios from "./axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

export function FriendshipButton({ receiverId }) {
    let dropdown;
    let currentStatus;
    const [friendshipStatus, setStatus] = useState("");
    const [buttonText, setText] = useState("");

    useEffect(
        () => {
            (async () => {
                currentStatus = await axios.get(
                    "/friendship-status/" + receiverId
                );
                //    console.log("currentStatus", currentStatus.data);
                // console.log(
                //     "currentStatus.data.friendshipStatus",
                //     currentStatus.data.friendshipStatus
                // );
                setStatus(currentStatus.data.friendshipStatus);
                setText(currentStatus.data.buttonText);
            })();
        },
        [currentStatus]
    );

    // console.log("friend button have been rendered!");
    // console.log("currentStatus", currentStatus);
    //
    // console.log("friendshipStatus", friendshipStatus);
    // console.log("receiverId", receiverId);

    async function updateFriendship() {
        console.log("button clicked");
        let newStatus;

        try {
            switch (friendshipStatus) {
                case "Add Friend":
                    newStatus = await axios.post("/add-friend", {
                        otherUserId: receiverId
                    });
                    console.log("friend request sent: ");
                    break;
                case "Cancel Request":
                    newStatus = await axios.post("/end-friendship", {
                        otherUserId: receiverId
                    });
                    break;
                case "Unfriend":
                    newStatus = await axios.post("/end-friendship", {
                        otherUserId: receiverId
                    });
                    break;
                case "Accept":
                    newStatus = await axios.post("/accept-friendship", {
                        otherUserId: receiverId
                    });
                    break;
                default:
                    console.log("hmm, Iguess something went wrong...");
            }
            newStatus = newStatus.data;
            console.log("newStatus: ", newStatus);
            setStatus(newStatus);
        } catch (err) {
            console.log("/change-friendship-status error", err);
        }
    }

    return (
        <div className="dropdown">
            <button className="friend-btn" onClick={updateFriendship}>
                {friendshipStatus === "Unfriend" && (
                    <FontAwesomeIcon icon={faCheck} />
                )}
                {friendshipStatus}
            </button>
            {friendshipStatus === "Unfriend" && (
                <div className="dropdown-content">
                    <a href="#">Get notifications</a>
                    <a href="#">Close friends</a>
                    <a href="#">acquaintances</a>
                    <a href="#">Add to another list</a>
                    <a href="#" onClick={updateFriendship}>
                        {friendshipStatus}
                    </a>
                </div>
            )}
            {friendshipStatus === "Unfriend" && (
                <button className="friend-btn" onClick={updateFriendship}>
                    Following
                </button>
            )}
        </div>
    );
}
