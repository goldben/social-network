import React from "react";
import axios from "axios";

export class login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    handleChange({ target }) {
        console.log("target name: ", target.name);
        console.log("target value: ", target.value);
        this[target.name] = target.value;
    }
    submit() {
        console.log("post login,", this.email);
        const that = this;
        axios
            .post("/login", {

                email: that.email,
                pass: that.pass
            })
            .then(({ data }) => {
                if (data.success) {
                    location.replace("/");
                } else {
                    this.setState({
                        error: true
                    });
                }
            });
    }
    render() {
        return (
                <div className="registration_form">

                    <input
                        name="email"
                        type="email"
                        placeholder="email"
                        required
                        onChange={e => this.handleChange(e)}
                    />
                    <input
                        name="pass"
                        type="password"
                        placeholder="password"
                        required
                        onChange={e => this.handleChange(e)}
                    />
                    <button
                        className="registration_form_button"
                        onClick={e => this.submit(e)}
                    >
                        {" "}
                        Login
                    </button>
                    {this.state.error && (
                        <div className="error">
                        	Error, please try again.
                        </div>
                    )}
                    <p>
                        Not yet a member? <a href="/register"> Register </a>
                    </p>
                </div>
        );
    }
}
