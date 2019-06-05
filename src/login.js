import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";


export class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
			email: ''
		};
    }
	handleChange({ target }) {
        // console.log("target name: ", target.name);
        // console.log("target value: ", target.value);
        this.setState({
			[target.name]: target.value
		})
    }
    submit(e) {
		e.preventDefault();
        console.log("post login,", this.email);
		console.log("post login,", this.password);

        const that = this;
        axios
            .post("/login", {

                email: that.state.email,
                password: that.state.password
            })
            .then(({ data }) => {
                if (data.success) {
                    location.replace("/site");
                } else {
                    this.setState({
                        error: data.error
                    });
                }
            });
    }
	    render() {
        return (
                <form onSubmit={e => this.submit(e)} className="login-form">
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
                    <button disabled={!this.state.email}
                        className="login-form-btn"
                        type="submit"
                    >
                        Login
                    </button>
                    {this.state.error && (
                        <div className="error-message">
                        	{this.state.error}
                        </div>
                    )}
                    <p>
                        Not yet a member?  <Link to="/"> Register </Link>
                    </p>
                </form>
        );
    }
}
