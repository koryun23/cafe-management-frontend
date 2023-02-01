import React from 'react';
import { Redirect } from 'react-router-dom';
import '../css/Login.css';
import "../css/ChooseRole.css";
import BackgroundImage from './BackgroundImage.js';
import LoginBox from './LoginBox.js';

class LoginPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {authenticated: false, role: ""};
    }

    render() {
        if(this.state.authenticated) {
            this.props.onLogin(this.state.role);
            return <Redirect to="/home" />
        }
        return (
            <div className="login-page justify-content-center">
                <BackgroundImage />
                <SiteDescription />
                <LoginBox onLogin={(role) => this.setState({authenticated: true, role: role})}/>
            </div>
        );
    }
}

class SiteDescription extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h1 className="description">
                    Cafe Management
                </h1>
            </div>
        );
    }
}


export default LoginPage;