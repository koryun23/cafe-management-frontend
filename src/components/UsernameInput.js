import React from 'react';

class UsernameInput extends React.Component {

    constructor(props) {
        super(props);
        this.handleUsernameInput = this.handleUsernameInput.bind(this);
    }

    handleUsernameInput(event) {
        this.props.onUsernameChange(event.target.value);
    }

    render() {
        return (
            <div className="form-group custom-form">
                <label>Username</label>
                <input type="text"
                    name="username"
                    placeholder="Username"
                    onChange={this.handleUsernameInput} 
                    className="form-control"
                    value={this.props.value} />
            </div>
        );
    }
}

export default UsernameInput;