import React from "react";
import axios from "./axios";
import { connect } from "react-redux";
import { getBio, updateBio } from "./actions";

class Bio extends React.Component {
    componentDidMount() {
        this.props.dispatch(getBio());
    }
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
        });
    }
    submit(e) {
        e.preventDefault();
        this.props.dispatch(updateBio(this.state.newBio));
        this.setState({
            editorVisible: false
        });
    }
    showBioEditor() {
        this.setState({
            editorVisible: true
        });
    }
    hideBioEditor(e) {
        this.setState({
            editorVisible: false
        });
    }

    render() {
        if (!this.props.bio) {
            return <div className="loading" />;
        } else {
            return (
                <div className="bio-container" onClick={this.showBioEditor}>
                    <div className="text-container">{this.props.bio}</div>

                    {this.state.editorVisible && (
                        <div className="bio-editor">
                            <div
                                className="x-bio-editor-btn"
                                onClick={this.hideBioEditor}
                            >
                                x
                            </div>
                            <form
                                onSubmit={e => this.submit(e)}
                                className="bio-form"
                            >
                                <textarea
                                    rows="10"
                                    cols="85"
                                    name="textarea"
                                    onChange={e => this.handleChange(e)}
                                    defaultValue={this.props.bio}
                                />

                                <button
                                    className="login-form-btn"
                                    type="submit"
                                >
                                    Save changes
                                </button>
                            </form>
                        </div>
                    )}
                </div>
            );
        }
    }
}
const mapStateToProps = state => {
    if (state.bio) {
        return {
            bio: state.bio
        };
    } else {
        return {
            bio: "go on, write your bio"
        };
    }
};

export default connect(mapStateToProps)(Bio);
