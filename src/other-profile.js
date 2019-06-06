import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import axios from "./axios";
import { Profile } from "./profile";
import { ProfilePic } from "./profilepic";


export class OtherProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state= {};
    }
    componentDidMount() {
        const id = this.props.match.params.id;
        axios.get("/otheruser/" + id).then(( {data} ) => {
            if (data.error) {
                this.props.history.push('/');
            } else {
				console.log("data at other profile", data);
                this.setState(data);
            }
        });
    }

    render() {
		console.log("this.state", this.state);
        return (
			<div className="profile-container">
                <div className="cover-photo-container">
                    <ProfilePic
                        imageUrl={this.state.imageUrl}
                        first={this.state.first}
                        last={this.state.last}
                    />
					<div className="timeline-nav-top">
					</div>
                </div>

                <div className="profile-bottom">
                    <div className="bio-container">
						<h1>{this.state.first}'s bio</h1>
                            {this.state.bio}

                    </div>
                    <div className="posts-container">
					<h1>{this.state.first}'s posts</h1>
                    </div>
                </div>
            </div>
        );
    }
};
