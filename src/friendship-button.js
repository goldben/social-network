import React from "react";
import { useState, useEffect } from "react";
import axios from "./axios";

export function FriendshipButton({ recieverId, currentStatus }) {
    console.log("friend button have been rendered!");
    console.log("currentStatus", currentStatus);

    async function updateFriendship() {
        try {
            const newstatus = axios.post("/change-friendship-status/", {
                recieverId: recieverId
            });
            currentStatus = newStatus;
        } catch (e) {
            console.log("friendship button error: ", e);
        }
    }

    return <button onClick={updateFriendship}>{currentStatus}</button>;
}
