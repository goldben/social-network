import React from "react";
import axios from "./axios";

export class Bio extends React.Component{
	constructor(props) {
        super(props);
		this.state = {
			editorVisible: false
        };
		this.showBioEditor = this.showBioEditor.bind(this);
		this.hideBioEditor = this.hideBioEditor.bind(this);
    }
	handleChange({ target }) {
		 console.log("name: ", target.name);
		// console.log("target value: ", target.value);
		this.setState({
			newBio: target.value
		})
	}
	submit(e) {
		e.preventDefault();
		console.log("new bio,", this.state.newBio);

		const that = this;
		axios
			.post("/edit-bio", {

				bio: that.state.newBio
			})
			.then(({ data }) => {
				if (data.bio) {
					that.props.updateBio(data.BIO);
					this.props.editorVisible = false;
				} else {
					this.setState({
						error: data.error
					});
				}
			});
	}
	showBioEditor() {
		this.setState({
			editorVisible: true
		})

	}
	hideBioEditor(e) {
		e.stopPropagation()
		console.log("dfjkhslfkjnskjf");
		this.setState({
			editorVisible: false
		});
	}

	render() {
		var bio = this.props.bio || "go on, write your bio";

    return (
		<div className="bio"
		onClick={this.showBioEditor}
		>
		<p>{bio}</p>
		{this.state.editorVisible &&
			<div className="bio-editor">
			<div className="x-bio-editor-btn" onClick={this.hideBioEditor}>x</div>

			<form onSubmit={e => this.submit(e)} className="bio-form">
			<textarea
			name="textarea"
			onChange={e => this.handleChange(e)}
			>
				{this.props.bio}
			</textarea>

			<button
				className="login-form-btn"
				type="submit"
			>

				save
			</button>
			</form>
			</div>}
		</div>
    );
}
}
