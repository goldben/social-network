import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { socket } from "./socket";
import { init } from "./socket";

import { getMessages, newMessage } from "./actions";

class LastChats extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.currentChat = this.currentChat.bind(this);
    }

    currentChat(e) {
        this.setState({
            currentChat: e
        });
    }

    render() {
        return (
            <div className="messenger">
                <h3>messenger</h3>
                <div className="chat-display">
                    {this.props.privateMessages &&
                        this.props.privateMessages.map(msg => (
                            <div className="message-item" key={msg.id}>
                                <Link to={`/user/${msg.receiver_id}`}>
                                    <p>{msg.created_at}</p>
                                    <div className="message">
                                        <div className="img-icon">
                                            <img src={msg.imgurl} />
                                        </div>
                                        <div className="message-text">
                                            <p>{msg.message}</p>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
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

export default connect(mapStateToProps)(LastChats);
