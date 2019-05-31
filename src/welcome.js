import React from 'react';
import axios from 'axios';

export class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    handleChange({ target }) {
        this.setState(
            [target.name]: target.value
        );
    }
    submit() {
        axios.post('/register', {
            first: this.state.first,
            last: this.state.last
        }).then(
            ({data}) => {
                if (data.success) {
                    location.replace('/');
                } else {
                    this.setState({
                        error: true
                    })
                }
            }
        )
    }
    render() {
        return (
            <div>
                {this.state.error && <div className="error">Oops!</div>}
                <input name="first" onChange={e => this.handleChange(e)} />
                <input name="last" />
                <input name="email" />
                <input name="pass" />
                <button onClick={e => this.submit()}>submit</button>
            </div>
        )
    }
}
