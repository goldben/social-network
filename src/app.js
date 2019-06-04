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

            <div className="wrapper">
			<header>
				<img src="logo.jpg" />
				<input name="search" type="text"/>
				<h3>whatever</h3>
			</header>
			<div className="cover-photo-container">

                <ProfilePic
                    imageUrl={this.state.imageUrl}
                    first={this.state.first}
                    clickHandler={e => this.setState({ uploaderVisible: true })}
                />
                {this.state.uploaderVisible && <Uploader
				/>}
				</div>
				<div className="container">
					<div className="bio">
					<p>sjlkvnasdökjvnsaökjfvnfslkjnfdkjlvndfjlkdbvl</p>
					</div>
					<img src="/img/logo.jpg" />

				</div>
            </div>
        )
    }
}
