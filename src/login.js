import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";


export class Login extends React.Component {
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
		console.log("post login,", this.password);

        const that = this;
        axios
            .post("/login", {

                email: that.email,
                password: that.password
            })
            .then(({ data }) => {
                if (data.success) {
                    location.replace("/site");
                } else {
                    this.setState({
                        error: true
                    });
                }
            });
    }
    render() {
        return (
                <div className="login-form">
                    <input
                        name="email"
                        type="email"
                        placeholder="email"
                        required
                        onChange={e => this.handleChange(e)}
                    />
                    <input
                        name="password"
                        type="password"
                        placeholder="password"
                        required
                        onChange={e => this.handleChange(e)}
                    />
                    <button
                        className="login-form-btn"
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
                        Not yet a member?  <Link to="/"> Register </Link>
                    </p>
                </div>
        );
    }
}
