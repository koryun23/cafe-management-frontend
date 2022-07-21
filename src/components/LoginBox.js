import React from 'react';
import UsernameInput from './UsernameInput';
import PasswordInput from './PasswordInput';
import Submit from './Submit';

class LoginBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {username: "", password: ""};
        this.handleUsernameInput = this.handleUsernameInput.bind(this);
        this.handlePasswordInput = this.handlePasswordInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleUsernameInput(username) {
        this.setState({username : [username]});
    }

    handlePasswordInput(password) {
        this.setState({password : [password]});
    }

    handleSubmit(event) {
        console.log(this.state.username + " " + this.state.password);
        this.setState({username: "", password: ""});
        event.preventDefault();
    }

    render() {
        return (
            <div className="login-box align-items-center">
                <form className="login-form">
                    <UsernameInput onUsernameChange={this.handleUsernameInput} value={this.state.username}/>
                    <PasswordInput onPasswordChange={this.handlePasswordInput} value={this.state.password}/>
                    <Submit onSubmit={this.handleSubmit} value="Log in"/>
                </form>
            </div>   
        );
    }
}

export default LoginBox;