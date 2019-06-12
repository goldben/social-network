import React from "react";
import { useState, useEffect } from "react";
import axios from "./axios";

export function FriendshipButton({ otherProfileId, currentStatus }) {
    const [friendshipStatus, setStatus] = useState("");
    useEffect(
        () => {
            setStatus(currentStatus);
        },
        [currentStatus]
    );

    console.log("friend button have been rendered!");
    console.log("currentStatus", currentStatus);

    console.log("friendshipStatus", friendshipStatus);
    console.log("otherProfileId", otherProfileId);

    async function updateFriendship() {
        console.log("button clicked");
        try {
            console.log("trying");
            let newStatus = await axios.post("/change-friendship-status", {
                otherProfileId: otherProfileId,
                action: friendshipStatus
            });
            newStatus = newStatus.data;
            console.log("newStatus: ", newStatus);
            setStatus(newStatus);
        } catch (e) {
            console.log("friendship button error: ", e);
        }
    }

    return <button onClick={updateFriendship}>{friendshipStatus}</button>;
}
