import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export class Registration extends React.Component {
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
        console.log("post register, first", this.first);
        const that = this;
        axios
            .post("/register", {
                first: that.first,
                last: that.last,
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
                <div className="registration-form">
                    <input
                        name="first"
                        type="text"
                        placeholder="first name"
                        required
                        onChange={e => this.handleChange(e)}
                    />
                    <input
                        name="last"
                        type="text"
                        placeholder="last name"
                        required
                        onChange={e => this.handleChange(e)}
                    />
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
                        className="registration-form-btn"
                        onClick={e => this.submit(e)}
                    >
                        {" "}
                        register
                    </button>
                    {this.state.error && (
                        <div className="error">
                        	Error, please try again.
                        </div>
                    )}
                    <p>
                        Already a member? <Link to="/login"> Login </Link>
                    </p>
                </div>
        );
    }
}
