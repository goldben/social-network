import React from "react";
import { useState, useEffect } from "react";
import axios from "./axios";

export function FriendshipButton({ receiverId }) {
    let dropdown;
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
        try {
            console.log("trying");
            let newStatus = await axios.post("/change-friendship-status", {
                receiverId: receiverId,
                action: friendshipStatus
            });
            newStatus = newStatus.data;
            console.log("newStatus: ", newStatus);
            if (newStatus == "Unfriend") {
                dropdown = true;
            } else {
                dropdown = false;
            }
            setStatus(newStatus);
        } catch (e) {
            console.log("friendship button error: ", e);
        }
    }

    return (
        <div className="dropdown">
            <button className="friend-btn" onClick={updateFriendship}>
                {friendshipStatus}
            </button>
            {dropdown && (
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
        </div>
    );
}
