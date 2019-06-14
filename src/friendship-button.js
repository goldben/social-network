import React from "react";
import { useState, useEffect } from "react";
import axios from "./axios";
import { getFriends, send, accept, unfriend } from "./actions";

export function FriendshipButton({ receiverId }) {
    let currentStatus;
    const [friendshipStatus, setStatus] = useState("");
    useEffect(
        () => {
            (async () => {
                currentStatus = await axios.get(
                    "/friendship-status/" + receiverId
                );
                //    console.log("currentStatus", currentStatus.data);
                console.log(
                    "currentStatus.data.friendshipStatus",
                    currentStatus.data.friendshipStatus
                );
                setStatus(currentStatus.data.friendshipStatus);
            })();
        },
        [currentStatus]
    );

    console.log("friend button have been rendered!");
    console.log("currentStatus", currentStatus);

    console.log("friendshipStatus", friendshipStatus);
    console.log("receiverId", receiverId);

    async function updateFriendship() {
        console.log("button clicked");
        let newStatus;

        try {
            switch (friendshipStatus) {
                case "Add Friend":
                    (newStatus = await send),
                        {
                            otherUserId: receiverId
                        };
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
        <button className="friend-btn" onClick={updateFriendship}>
            {friendshipStatus}
        </button>
    );
}
