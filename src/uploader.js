import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";


export class Uploader extends React.Component {
	constructor(props) {
    super(props);
      this.state = {
        selectedFile: null
     	}

 	}
	handleChange(event) {
		this.setState({
	      selectedFile: event.target.files[0],
	      loaded: 0
	    })
	}
    submit(e) {
		const data = new FormData()
	   	data.append('file', this.state.selectedFile)
	   	axios.
        	post("/upload", data)
            .then(res => {
				this.props.uploaded(res.data.imageurl);
                 console.log(res.statusText)
        }).catch(e => {
			console.log("upload photo", e);
		})
    }
    render() {
		console.log("props in uploader", this.props);
        return (
			<div className="uploader">
			<div className="x-uploader-btn" onClick={(this.props.hideUploader)}>X</div>
			<p>change profile image</p>

			<form>
			<input type="file"
			name="file"
			onChange={(e=> this.handleChange(e))}/>

				<button type="button"
				className="upload-btn"
				onClick={(e=> this.submit(e))}>Upload
				</button>
			</form>
			</div>
        );
    }
}
