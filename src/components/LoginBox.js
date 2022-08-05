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

    componentWillUnmount() {
        console.log("Login box did unmount");
    }

    componentDidMount() {
        console.log("Login box did mount");
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
            localStorage.setItem("token", res.headers.token);
            if(res.status == 200) {
                this.setState({auth: true, firstName: res.data.firstName, lastName: res.data.secondName, token: res.data.token, role: res.data.role}, () => (
                    console.log(this.state)
                ));
            }
        });
    }

    render() {
        if(this.state.auth) {
            return <Auth username={this.state.username}
                         firstName={this.state.firstName} 
                         lastName={this.state.lastName}/> 
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
        // if(this.state.auth) {
        //     return <Redirect to="/home" /> ;
        // }
        // return (
        //     <div className="login-box align-items-center">
        //         <form className="login-form">
        //             <UsernameInput onUsernameChange={this.handleUsernameInput} value={this.state.username}/>
        //             <PasswordInput onPasswordChange={this.handlePasswordInput} value={this.state.password}/>
        //             <Submit onSubmit={this.handleSubmit} value="Log in"/>
        //         </form>
        //     </div>   
        // );
    }
}

function Auth(props) {
    return <Redirect to="/home"/>
    //props.history.push("/home");
    // return <HomePage username={props.username}
    //                  firstName={props.firstName} 
    //                  lastName={props.lastName} 
    //                  userRole="MANAGER"/>
}

export default LoginBox;