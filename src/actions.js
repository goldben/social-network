import axios from "./axios";

// all ajax requests will go in this file
export async function getBio(bio) {
    try {
        let data = await axios.get("/user");
        return {
            type: "GET_BIO",
            data: data.data.bio
        };
    } catch (err) {
        console.log(err);
    }
}
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

export function send(id) {
    axios.post("/add-friend", {
        otherUserId: id
    });
    console.log("action: friend request sent");
    return {
        type: "SEND_FRIEND_REQUEST",
        data: id
    };
}
export function updateBio(newBio) {
    axios.post("/edit-bio", {
        bio: newBio
    });
    console.log("bio updated");
    return {
        type: "UPDATE_BIO",
        data: newBio
    };
}
export function accept(id) {
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
export function getMessages(msgs) {
    return {
        type: "GET_CHAT_HISTORY",
        data: msgs
    };
}
export function getPrivateMessages(msgs) {
    return {
        type: "GET_PRIVATE_CHAT_HISTORY",
        data: msgs
    };
}
export function newMessage(msg) {
    return {
        type: "NEW_MESSAGE",
        data: msg
    };
}
export function currentChat(id) {
    return {
        type: "CURRENT_CHAT",
        data: id
    };
}
