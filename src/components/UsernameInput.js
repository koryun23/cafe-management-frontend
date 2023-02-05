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
                <input type="text"
                    name="username"
                    placeholder="Username"
                    onChange={this.handleUsernameInput} 
                    className="form-control custom-username-input"
                    value={this.props.value} />
            </div>
        );
    }
}

export default UsernameInput;