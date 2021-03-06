import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: ""
        };
    }
    handleChange({ target }) {
        // console.log("target name: ", target.name);
        // console.log("target value: ", target.value);
        this.setState({
            [target.name]: target.value
        });
    }
    submit(e) {
        e.preventDefault();
        console.log("post login,", this.email);
        console.log("post login,", this.password);

        axios
            .post("/login", {
                email: this.state.email,
                password: this.state.password
            })
            .then(({ data }) => {
                if (data.success) {
                    location.replace("/profile/about");
                } else {
                    this.setState({
                        error: data.error
                    });
                }
            });
    }
    render() {
        return (
            <div className="bluebar">
                <h1>social network</h1>
                <div className="login-form">
                    <form onSubmit={e => this.submit(e)}>
                        <div>
                            <span>email</span>

                            <input
                                name="email"
                                type="email"
                                placeholder="email"
                                required
                                onChange={e => this.handleChange(e)}
                            />
                        </div>

                        <div>
                            <span> passsword</span>
                            <input
                                name="password"
                                type="password"
                                placeholder="password"
                                required
                                onChange={e => this.handleChange(e)}
                            />
                        </div>
                        <div>
                            <span />
                            <button
                                disabled={!this.state.email}
                                className="login-form-btn"
                                type="submit"
                            >
                                Login
                            </button>
                        </div>

                        {this.state.error && (
                            <div className="error-message">
                                {this.state.error}
                            </div>
                        )}
                    </form>
                </div>
            </div>
        );
    }
}
