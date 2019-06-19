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
        return (
            <div className="chat-box">
                <div className="chat-header">
                    <div className="img-icon">
                        <img src={this.props.imgurl} />
                    </div>
                    <div className="info">
                        <p>
                            {this.props.first} {this.props.last}
                        </p>
                    </div>
                    <div
                        className="x-uploader-btn"
                        onClick={this.props.hideChatBox}
                    >
                        X
                    </div>
                </div>
                <div className="chat">
                    <div className="chat-display">
                        {this.props.messages &&
                            this.props.messages.map(msg => (
                                <div className="message-item" key={msg.id}>
                                    <p>{msg.created_at}</p>

                                    <div className="message">
                                        <div className="img-icon">
                                            <img src={msg.imgurl} />
                                        </div>
                                        <div className="message-text">
                                            <p>{msg.message}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>
                    <div className="text-container">
                        <form
                            onSubmit={e => this.sendMessage(e)}
                            className="messge-form"
                            defaultValue=""
                        >
                            <textarea
                                rows="2"
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
            </div>
        );
    }
}

const mapStateToProps = state => {
    console.log("state ", state.privateMessages);

    return {
        messages: state.privateMessages
    };
};

export default connect(mapStateToProps)(ChatBox);
