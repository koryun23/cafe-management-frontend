import React from 'react';

class PasswordInput extends React.Component {
    constructor(props) {
        super(props);
        this.handlePasswordInput = this.handlePasswordInput.bind(this);
    }

    handlePasswordInput(event) {
        this.props.onPasswordChange(event.target.value);
    }

    render() {
        return (
            <div className="form-group custom-form">
                <input type="password"
                    name="password"
                    placeholder="Password"
                    onChange={this.handlePasswordInput}
                    className="form-control custom-password-input" 
                    value={this.props.value} />
            </div>
        );
    }
}

export default PasswordInput;