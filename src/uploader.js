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
                 console.log(res.statusText)
        });
    }
    render() {
        return (
			<div className="uploader">
			<form>
			<input type="file"
			name="file"
			onChange={(e=> this.handleChange(e))}/>

				<button type="button"
				className="upload-btn"
				onClick={(e=> this.submit(e))}>Upload
				</button>

				{this.state.error && (
					<div className="error-message">
						{this.state.error}
					</div>
				)}

			</form>
			</div>
        );
    }
}
