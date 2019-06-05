import React from "react";
import { HashRouter, Route } from "react-router-dom";
import axios from "./axios";
import { Profile } from "./profile";
import { Uploader} from "./uploader";

export class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            uploaderVisible: false
        };
        this.updateBio = this.updateBio.bind(this);
        this.uploaded = this.uploaded.bind(this);
		this.showUploader = this.showUploader.bind(this);
		this.hideUploader = this.hideUploader.bind(this);

    }

    uploaded(url) {
        this.setState({
            imageUrl: url,
            uploaderVisible: false
        });
    }
    updateBio(newText) {
        this.setState({
            bio: newText
        });
    }
	showUploader() {
		this.setState({
			uploaderVisible: true
		});

	}
	hideUploader() {
		this.setState({
			uploaderVisible: false
		});
	}

    componentDidMount() {
        axios.get("/user").then(({ data }) => {
            if (data.error) {
                location.replace("/welcome");
            } else {
                this.setState(data);
            }
        });
    }

    render() {
		if (!this.state.id) {
            return <img src="/img/spinner.gif"/>;
        }
        return (
            <div className="app-container">
                <header>
                    <img src="logo.jpg" />
                    <input name="search" type="text" />
                    <h3> whatever </h3>
                </header>
                <Profile
					imageUrl={this.state.imageUrl}
                    first={this.state.first}
					last={this.state.last}
					bio={this.state.bio}
					showUploader={this.showUploader}
					updateBio={this.updateBio}
				 />
                {this.state.uploaderVisible && <Uploader
					hideUploader={this.hideUploader}
					/>}
            </div>
        );
    }
}
