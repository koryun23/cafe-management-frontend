import React from 'react';
import UsernameInput from './UsernameInput';
import PasswordInput from './PasswordInput';
import Submit from './Submit'; 
import axios from 'axios';
import { Redirect, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FaUserAlt } from 'react-icons/fa';
import HomePage from './HomePage';
import { withRouter } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { toHaveFocus } from '@testing-library/jest-dom/dist/matchers';
import ErrorMessage from './ErrorMessage';
import ChooseRole from './ChooseRole';
import { faLock, faUserAlt, faUserFriends, faUserLarge, faUserLock } from '@fortawesome/free-solid-svg-icons';

const API_URL = "http://localhost:7000/";

class LoginBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {username: "", 
                      password: "", 
                      firstName: "",
                      lastName: "",
                      token: "",
                      expiresIn: "",
                      roles: [],
                      auth: false,
                      errorMessages: [],
                      showChooseRolePage: false};
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
                       expiresIn: "",
                       roles: [],
                       auth: false,
                       errorMessages: [],
                       showChooseRolePage: false});
    }

    handleSubmit(event) {
        event.preventDefault();
        axios.post(API_URL + "login", {
            username: this.state.username, 
            password: this.state.password
        }).then(res => {
            console.log(res);
            this.setState({
                token: res.data.token,
                expiresIn: res.data.expiresIn,
                username: res.data.username,
                firstName: res.data.firstName,
                lastName: res.data.secondName, 
                roles: res.data.role,
            });
            if(res.data.role.length > 1) {
                this.setState({showChooseRolePage: true})
            } else {
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("expiresIn", res.data.expiresIn);
                localStorage.setItem("username", res.data.username);
                localStorage.setItem("firstName", res.data.firstName);
                localStorage.setItem("lastName", res.data.secondName);
                localStorage.setItem("role", res.data.role[0]);
                this.setState({auth: true}, () => console.log(this.state));
            }
        }).catch(err => {
            this.setState({errorMessages: ["One of the provided credentials is wrong"]})
            console.log(err);
        });
    }

    render() {
        if(this.state.auth) {
            this.props.onLogin(localStorage.getItem("role"));
            return <Redirect to="/home"/> 
        }
        return (
            <div className="login-box align-items-center">
                <form className={this.state.showChooseRolePage ? "login-form blur" : "login-form"}>
                    {this.state.errorMessages.length > 0 && <label className="login-error">{this.state.errorMessages[0]}</label>}
                    <br></br>
                    <div className="username-div">
                        <div className="icon">
                            <FontAwesomeIcon icon={faUserLarge} size="lg"/>
                        </div>
                        <UsernameInput onUsernameChange={this.handleUsernameInput} value={this.state.username}/>
                    </div>
                    <div className="password-div">
                        <div className="icon">
                            <FontAwesomeIcon icon={faLock} size="lg"/>
                        </div>
                        <PasswordInput onPasswordChange={this.handlePasswordInput} value={this.state.password}/>

                    </div>
                    <button className="custom-button-login"
                            onClick={this.handleSubmit}>
                        Log in
                    </button>
                </form>
                {this.state.showChooseRolePage &&
                <ChooseRole availableRoles={this.state.roles} 
                            username={this.state.username}
                            firstName={this.state.firstName}
                            lastName={this.state.lastName}
                            token={this.state.token}
                            onClose={() => {this.setState({showChooseRolePage: false})}} 
                            onLogin={this.props.onLogin}/>}
            </div>   
        );
    }
}

export default LoginBox;