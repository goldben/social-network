import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
export class Uploader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedFile: null
        };
    }
    handleChange(event) {
        this.setState({
            selectedFile: event.target.files[0],
            loaded: 0
        });
    }
    submit(e) {
        const data = new FormData();
        data.append("file", this.state.selectedFile);
        axios
            .post("/upload-cover", data)
            .then(res => {
                console.log("res.data in uploader", res.data);
                this.props.hideUploader;
                this.props.uploaded(res.data.imageUrl);
            })
            .catch(e => {
                console.log("upload photo", e);
            });
    }
    render() {
        console.log("props in uploader", this.props);
        return (
            <div className="dropdown">
                <span className="popup">
                    <FontAwesomeIcon icon={faCamera} />
                    <p>Upload Cover Photo</p>
                </span>

                <div className="dropdown-content">
                    <a href="#">select photo</a>
                    <form>
                        <input
                            type="file"
                            name="file"
                            onChange={e => this.handleChange(e)}
                        />

                        <button
                            type="button"
                            className="upload-btn"
                            onClick={e => this.submit(e)}
                        >
                            Upload
                        </button>
                    </form>
                </div>
            </div>
        );
    }
}
