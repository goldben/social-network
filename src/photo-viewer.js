import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export class PhotoViewer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedFile: null
        };
    }

    render() {
        console.log("props in uploader", this.props);
        return (
            <div className="uploader">
                <div
                    className="x-uploader-btn"
                    onClick={this.props.hideUploader}
                >
                    X
                </div>
                <div className="update-container">
                    <div className="update-img">
                        <img src={this.props.coverImageUrl} alt="cover-image" />
                    </div>
                    <div className="update-img-form">
                        <div>
                            <Link to="/profile" className="owner">
                                <img src={this.props.imageUrl} />
                                <p>
                                    {this.props.first} {this.props.last}
                                </p>
                            </Link>
                        </div>
                        <div>
                            <span className="owner">
                                <img
                                    src={this.props.imageUrl}
                                    className="fake-owner"
                                />
                            </span>
                            <img src="./capture1.png" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
