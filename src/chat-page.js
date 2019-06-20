import React from "react";
import { connect } from "react-redux";
import { socket } from "./socket";
import { init } from "./socket";

import { getMessages, newMessage } from "./actions";

class ChatPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleChange = this.handleChange.bind(this);
        this.elemRef = React.createRef();
    }
    componentDidMount() {
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
    handleScroll() {
        this.elemRef.current.scrollTop =
            this.elemRef.current.scrollHeight +
            this.elemRef.current.offsetHeight;
    }

    render() {
        return (
            <div className="messenger">
                <div className="chat-list">
                    <h3>messenger</h3>
                    <div className="chat-display">
                        {this.props.privateMessages &&
                            this.props.privateMessages.map(msg => (
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
                </div>
                <div className="chat-right-panel">
                    <h3>this chat</h3>

                    <div className="chat-panel">
                        <div className="chat">
                            <div className="chat-display" ref={this.elemRef}>
                                {this.props.messages &&
                                    this.props.messages.map(msg => (
                                        <div
                                            className="message-item"
                                            key={msg.id}
                                        >
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
                                <textarea
                                    name="textarea"
                                    placeholder="type message"
                                    onChange={e => this.handleChange(e)}
                                    onKeyPress={e => this.sendMessage(e)}
                                />
                            </div>
                        </div>
                        <div className="manage-messages">
                            right side nonesense
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    console.log("state ", state);

    return {
        privateMessages:
            state.privateMessages && state.privateMessages.reverse(),
        messages: state.messages
    };
};

export default connect(mapStateToProps)(ChatPage);
