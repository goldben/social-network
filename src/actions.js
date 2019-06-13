import axios from "./axios";

// all ajax requests will go in this file

export async function getFriends() {
    try {
        let data = await axios.get("/get-friends");
        console.log("actions found these friends: ", data.data);
        return {
            type: "FRIENDS",
            data: data.data
        };
    } catch (err) {
        console.log(err);
    }
    return {};
}

export function acceptFriendRequest() {
    axios.post("/accept-friendship").then(({ data }) => {
        return {
            type: "ACCEPT_FRIEND_REQUEST",
            data: data
        };
    });
}
export function unfriend() {
    axios.post("/end-friendship").then(({ data }) => {
        return {
            type: "UNFRIEND",
            data: data
        };
    });
}
