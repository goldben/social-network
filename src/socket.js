import * as io from "socket.io-client";
import { getMessages, getPrivateMessages, newMessage } from "./actions";

let socket;

export const init = store => {
    if (!socket) {
        socket = io.connect();
        socket.on("getMessages", msgs => {
            console.log("GetMessages in socket", msgs);
            store.dispatch(getMessages(msgs));
        });
        socket.on("getPrivateMessages", msgs => {
            console.log("getPrivateMessages in socket", msgs);
            store.dispatch(getPrivateMessages(msgs));
        });
        socket.on("newMessage", msg => {
            console.log("newMessage in socket", msg);
            store.dispatch(newMessage(msg));
        });
    }
    return socket;
};
