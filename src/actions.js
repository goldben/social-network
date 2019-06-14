import axios from "./axios";

// all ajax requests will go in this file

export async function getFriends() {
    try {
        let data = await axios.get("/get-friends");
        console.log("actions found these friends: ", data.data);
        return {
            type: "GET_FRIENDS",
            data: data.data
        };
    } catch (err) {
        console.log(err);
    }
    return {};
}

export async function send(id) {
    data = await axios.post("/add-friend", {
        otherUserId: id
    });
    console.log("action: friend request sent");
    return {
        type: "SEND_FRIEND_REQUEST",
        data: id
    };
}

export async function accept(id) {
    axios.post("/accept-friendship", {
        otherUserId: id
    });
    console.log("action: accepted friend request");
    return {
        type: "ACCEPT_FRIEND_REQUEST",
        data: id
    };
}
export function unfriend(id) {
    axios.post("/end-friendship", {
        otherUserId: id
    });
    console.log("action: end friendship");
    return {
        type: "UNFRIEND",
        data: id
    };
}
