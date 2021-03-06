import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

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
            .post("/upload", data)
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
            <div className="uploader">
                <div className="x-btn" onClick={this.props.hideUploader}>
                    X
                </div>
                <div className="centralizer">
                    <span className="img-container">
                        <img src={this.props.imageUrl} />
                    </span>

                    <div className="update-img-form">
                        <p>change profile image</p>

                        <div>
                            <Link to="/profile" className="owner">
                                <img src={this.props.imageUrl} />
                                <p>
                                    {this.props.first} {this.props.last}
                                </p>
                            </Link>
                        </div>
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
                        <div>
                            <span className="owner">
                                <img
                                    src={this.props.imageUrl}
                                    className="fake-owner"
                                />
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
