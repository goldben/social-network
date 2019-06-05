import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import axios from './axios';
import {ProfilePic} from './profilepic';
import {Bio} from './bio';


export class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
			editorVisible: false,
        };


	}


    componentDidMount() {

    }
    render() {
		
        return (

            <div className="profile-container">

			<div className="cover-photo-container">

                <ProfilePic
                    imageUrl={this.props.imageUrl}
                    first={this.props.first}
					last={this.props.last}
                    showUploader={this.props.showUploader}
                />
			</div>


				<div className="bio-container">
					<Bio
					bio={this.props.bio}
					updateBio={this.props.updateBio}
					editorVisible={this.state.editorVisible}

                />
                </div>

				</div>
        )
    }
}
