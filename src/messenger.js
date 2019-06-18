import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export class Messenger extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        io.on("connection", socket => {
            socket.emit("chat-message", "hello stranger");
        });
        console.log("props in uploader", this.props);
        return (
            <div className="messenger">
                <div className="screen">screen</div>
                <form>
                    <input type="text" className="messege-input" />
                    <button>send</button>
                </form>
            </div>
        );
    }
}
