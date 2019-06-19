import React from "react";
import { connect } from "react-redux";
import { socket } from "./socket";
import { init } from "./socket";

import { getMessages, newMessage } from "./actions";

class ChatBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        console.log("name: ", e.target.name);
        console.log("value: ", e.target.value);
        this.setState({
            newMessage: e.target.value
        });
    }
    sendMessage(e) {
        e.preventDefault();
        console.log("send message: ", this.state.newMessage);
        let socket = init();
        socket.emit("newMessage", this.state.newMessage);
    }

    render() {
        console.log("render state.messages: ", this.props.messages);
        return (
            <div className="messenger">
                {this.props.messages &&
                    this.props.messages.map(msg => (
                        <div className="chat-display" key={msg.id}>
                            <div className="chat-header">
                                <div className="chat-user-data">
                                    {msg.first} {msg.last} wrote on
                                    {msg.created_at}
                                </div>
                            </div>

                            <div className="messages-item">
                                <p>{msg.message}</p>
                            </div>
                        </div>
                    ))}
                <div className="text-container">
                    <form
                        onSubmit={e => this.sendMessage(e)}
                        className="messge-form"
                    >
                        <textarea
                            rows="3"
                            cols="35"
                            name="textarea"
                            onChange={e => this.handleChange(e)}
                        />

                        <button className="messge-form-btn" type="submit">
                            Send
                        </button>
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    console.log("state ", state);
    return {
        messages: state.messages
    };
};

export default connect(mapStateToProps)(ChatBox);
