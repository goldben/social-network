import React from "react";
import { useState, useEffect } from "react";
import axios from "./axios";

export function FriendshipButton({ recieverId, currentStatus }) {
    console.log("friend button have been rendered!");
    console.log("currentStatus", currentStatus);
    console.log("recieverId", recieverId);

    async function updateFriendship() {
        console.log("button clicked");
        try {
            console.log("trying");
            const newStatus = await axios.post("/change-friendship-status", {
                recieverId: recieverId,
                action: currentStatus
            });
            currentStatus = newStatus;
        } catch (e) {
            console.log("friendship button error: ", e);
        }
    }

    return <button onClick={updateFriendship}>{currentStatus}</button>;
}
