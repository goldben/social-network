import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import axios from './axios';
import {ProfilePic} from './profilepic';
import {Uploader} from './uploader';

export class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            uploaderVisible: false
        };
    }
    componentDidMount() {
        axios.get('/user').then(({ data }) => {
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
            <div>
                <ProfilePic
                    imageUrl={this.state.imageUrl}
                    first={this.state.first}
                    clickHandler={e => this.setState({ uploaderVisible: true })}
                />
                {this.state.uploaderVisible && <Uploader />}
				<img src="/img/logo.jpg" />

            </div>
        )
    }
}
