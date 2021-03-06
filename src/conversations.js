import React from "react";
import { connect } from "react-redux";
import { socket } from "./socket";
import { init } from "./socket";

import { getMessages, newMessage, currentChat } from "./actions";

class Conversations extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleChange = this.handleChange.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.elemRef = React.createRef();
    }
    componentDidMount() {
        this.props.dispatch(currentChat(this.props.id));
        this.handleScroll();
    }
    componentDidUpdate() {
        this.handleScroll();
    }

    handleChange(e) {
        this.setState({
            newMessage: e.target.value
        });
    }
    handleScroll() {
        this.elemRef.current.scrollTop =
            this.elemRef.current.scrollHeight +
            this.elemRef.current.offsetHeight;
    }

    sendMessage(e) {
        if (e.key === "Enter") {
            console.log("enter clicked");
            e.preventDefault();
            console.log("send message: ", this.state.newMessage);
            let socket = init();
            socket.emit("newMessage", {
                text: this.state.newMessage,
                receiverId: this.props.id
            });
            e.target.value = "";
        }
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
                    <img src="/chat2.png" />

                    <div className="x-btn" onClick={this.props.hideChatBox}>
                        X
                    </div>
                </div>
                <div className="chat">
                    <div className="chat-display" ref={this.elemRef}>
                        {this.props.messages &&
                            this.props.messages.map(msg => (
                                <div className="message-item" key={msg.id}>
                                    <p>
                                        {new Date(
                                            msg.created_at
                                        ).toDateString()}{" "}
                                        {new Date(
                                            msg.created_at
                                        ).toLocaleTimeString()}
                                    </p>

                                    <div className="message">
                                        <div className="img-icon">
                                            <img src={msg.imgurl} />
                                        </div>
                                        <div
                                            className={
                                                msg.sender_id == this.props.id
                                                    ? "message-text user1"
                                                    : "message-text user2"
                                            }
                                        >
                                            <p>{msg.message}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>
                    <div className="text-container">
                        <textarea
                            name="textarea"
                            placeholder="Type message..."
                            onChange={e => this.handleChange(e)}
                            onKeyPress={e => this.sendMessage(e)}
                        />
                    </div>
                    <img src="/chat.png" />
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    console.log("state ", state);
    //console.log(state.privateMessages[0].created_at.toDateString());
    let firstMsgs = [];
    state.privateMessages.forEach(msg => {
        chats.forEach(item => {
            if (msg.sender.id != item.id) {
                firstMsgs.push(msg);
            }
        });
    });
    console.log("firstMsgs: ", firstMsgs);
    return {
        messages: messages
    };
};

export default connect(mapStateToProps)(Conversations);
