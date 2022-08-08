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
import ErrorMessage from './ErrorMessage';


const API_URL = "http://localhost:7000/";

class LoginBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {username: "", 
                      password: "", 
                      firstName: "",
                      lastName: "",
                      token: "",
                      role: "",
                      auth: false,
                      errorMessages: []};
        this.handleUsernameInput = this.handleUsernameInput.bind(this);
        this.handlePasswordInput = this.handlePasswordInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleUsernameInput(username) {
        this.setState({username : username});
    }

    handlePasswordInput(password) {
        this.setState({password : password});
    }

    handleClose(event) {
        this.setState({username: "", 
                       password: "", 
                       firstName: "",
                       lastName: "",
                       token: "",
                       role: "",
                       auth: false,
                       errorMessages: []});
    }
    handleSubmit(event) {
        event.preventDefault();
        const response = axios.post(API_URL + "login", {
            username: this.state.username,
            password: this.state.password
        });
        response.then(res => {
            console.log(res.data);
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
            
        }).catch(res => {
            console.log(res)
            this.setState({errorMessages: ["One of the provided credentials is wrong"]});
        });
    }

    render() {
        if(this.state.auth) {
            return <Redirect to="/home"/> 
        }
        return (
            <div className="login-box align-items-center">
                <form className="login-form">
                    {this.state.errorMessages.length > 0 && <label className="login-error">One of the provided credentials is wrong</label>}
                    <br></br>
                    <UsernameInput onUsernameChange={this.handleUsernameInput} value={this.state.username}/>
                    <PasswordInput onPasswordChange={this.handlePasswordInput} value={this.state.password}/>
                    <Submit onSubmit={this.handleSubmit} value="Log in"/>
                </form>
                {/*this.state.errorMessages.length > 0 && <ErrorMessage message={this.state.errorMessages[0]} onClose={this.handleClose}/>*/}
            </div>   
        );
    }
}

export default LoginBox;