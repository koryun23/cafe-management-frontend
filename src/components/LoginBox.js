import React from 'react';
import UsernameInput from './UsernameInput';
import PasswordInput from './PasswordInput';
import Submit from './Submit'; 
import axios from 'axios';
import { Redirect, useLocation } from 'react-router-dom';
import HomePage from './HomePage';
import { withRouter } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { toHaveFocus } from '@testing-library/jest-dom/dist/matchers';


const API_URL = "http://localhost:8080/";

class LoginBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {username: "", 
                      password: "", 
                      firstName: "",
                      lastName: "",
                      token: "",
                      role: "",
                      auth: false};
        this.handleUsernameInput = this.handleUsernameInput.bind(this);
        this.handlePasswordInput = this.handlePasswordInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleUsernameInput(username) {
        this.setState({username : username});
    }

    handlePasswordInput(password) {
        this.setState({password : password});
    }

    handleSubmit(event) {
        event.preventDefault();
        const response = axios.post(API_URL + "login", {
            username: this.state.username,
            password: this.state.password
        });
        response.then(res => {
            console.log(res.data);
            if(res.status == 200) {
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("username", res.data.username);
                localStorage.setItem("firstName", res.data.firstName);
                localStorage.setItem("lastName", res.data.secondName);
                localStorage.setItem("role", res.data.role[0]);
                this.setState({auth: true, 
                               firstName: res.data.firstName, 
                               lastName: res.data.secondName, 
                               token: res.data.token, 
                               role: res.data.role}, 
                () => {
                    console.log(this.state)
                });
            }
        });
    }

    render() {
        if(this.state.auth) {
            return <Redirect to="/home"/> 
        }
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