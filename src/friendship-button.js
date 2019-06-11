import React from "react";
import { useState, useEffect } from "react";
import axios from "./axios";

export function FriendshipButton(currentStatus, userId) {
    const [friendshipStatus, setFriendshipStatus] = useState(currentStatus);

    useEffect(
        () => {
            console.log("friend button have been rendered!");
            let abort;
            axios
                .post("/change-friendship-status/" + userId)
                .then(newStatus => {
                    if (!abort) {
                        setFriendshipStatus(newStatus);
                        return () => {
                            abort = true;
                        };
                    }
                })
                .catch(err => {
                    console.log("friendship button error: ", err);
                });
        },
        [friendshipStatus]
    );

    return <button>{friendshipStatus}</button>;
}
